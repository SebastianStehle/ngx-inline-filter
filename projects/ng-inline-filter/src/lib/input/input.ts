import { ChangeDetectionStrategy, Component, computed, effect, input, model, output, signal, viewChild, viewChildren } from '@angular/core';
import { ComplexQuery, createComparison, FilterLogical, FilterModel, FilterNode, isLogicalAnd, isLogicalOr, SortField } from '../model';
import { Autocomplete } from "../autocomplete/autocomplete";
import { clone, getFieldOptions, getOperatorOptions, ModelContext } from '../utils';
import { Details } from "../details/details";
import { Node } from "../node/node";
import { OverlayModule } from '@angular/cdk/overlay';
import { Options } from '../options';
import { Dropdown } from "../dropdown/dropdown";
import { SameSize } from '../same-size';
import { NgScrollbarModule } from 'ngx-scrollbar';

const DEFAULT_QUERY: ComplexQuery = { filter: { and: [] }, text: '', sorting: [] };

@Component({
    selector: 'filter-input',
    templateUrl: './input.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [Autocomplete, Details, Dropdown, Node, OverlayModule, Dropdown, SameSize, NgScrollbarModule],
})
export class Input {
    /**
     * The model which defines the available operators and fields.
     */
    model = input.required<FilterModel>();

    /**
     * The options
     */
    options = input.required<Options>();

    /**
     * The actual query to edit.
     */
    query = model<ComplexQuery>(DEFAULT_QUERY);

    /**
     * Whether the autocomplete input is disabled.
     */
    disabled = input(false);

    /**
     * Whether the details are expanded.
     */
    isExpanded = input(false);

    /**
     * Indicates if horizontal scrolling should be enabled.
     */
    scrollable = input(true);

    /**
     * Indicates if the current query is bookmarked.
     */
    isBookmarked = input<boolean | null | undefined>();

    /**
     * Whenever the bookmark value has changed.
     */
    isBookmarkedChange = output<boolean>();

    /**
     * A search is triggered.
     */
    search = output<ComplexQuery>();

    context = computed(() => {
        const model = this.model();
        return {
            fields: getFieldOptions(model),
            model,
            operators: getOperatorOptions(model),
        } as ModelContext;
    });

    queryInput = viewChild(Autocomplete);

    addButton = viewChild(Dropdown);

    isLogicalAnd = computed(() => isLogicalAnd(this.query().filter));
    isLogicalOr = computed(() => isLogicalOr(this.query().filter));

    isMenuOpen = signal(false);

    filterNodes = viewChildren(Node);
    filterItems = computed(() => {
        const filter = this.query().filter;
        if (isLogicalAnd(filter)) {
            return filter.and;
        } else {
            return filter.or;
        }
    })

    constructor() {
        effect(() => {
            this.isMenuOpen.set(this.isExpanded());
        });
    }

    _focusLastFilter() {
        const filter = this.filterNodes();
        
        if (filter.length > 0) {
            filter[filter.length - 1]?.focusRemove();
        } else {
            this.queryInput()?.focus();
        }
    }

    _toggleMenu() {
        this.isMenuOpen.update(x => !x);
    }

    _toggleBookmark() {
        this.isBookmarkedChange.emit(!this.isBookmarked());
    }
    
    _changeQuery(text: string) {
        this._updateQuery(query => {
            query.text = text;
        });
    }

    _changeFilter(filter: FilterLogical) {
        this._updateQuery(query => {
            query.filter = filter;
        });
    }

    _changeSorting(sorting: SortField[]) {
        this._updateQuery(query => {
            query.sorting = sorting;
        });
    }

    _changeLogic() {
        this._updateQuery(query => {
            if (isLogicalAnd(query.filter)) {
                query.filter = { or: query.filter.and };
            } else {
                query.filter = { and: query.filter.or };
            }
        });
    }
    
    _changeFilterItem(index: number, filter: FilterNode) {
        this._updateQuery(query => {
            if (isLogicalAnd(query.filter)) {
                query.filter.and[index] = filter;
            } else {
                query.filter.or[index] = filter;
            }
        });
    }

    _removeFilter(index: number, byButton: boolean) {
        this._updateQuery(query => {
            if (isLogicalAnd(query.filter)) {
                query.filter.and.splice(index, 1);
            } else {
                query.filter.or.splice(index, 1);
            }
        });

        if (byButton) {
            setTimeout(() => {
                this._focusLastFilter();
            }, 50);
        }
    }
    
    _addFilter(fieldName: string, clearQuery: boolean) {
        const field = this.model().fields.find(x => x.name === fieldName)!;
        
        this._updateQuery(query => {
            if (isLogicalAnd(query.filter)) {
                query.filter.and.push(createComparison(field));
            } else {
                query.filter.or.push(createComparison(field));
            }
        });
        
        if (!clearQuery) {
            setTimeout(() => {
                this.queryInput()?.focus();
            }, 50);
        }
    }

    _updateQuery(update: (query: ComplexQuery) => void) {
        const query = cleanupQuery(this.query());

        update(query);
        this.query.set(query);
    }

    _handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.search.emit(this.query());
        }
    }
}

function cleanupQuery(filter: ComplexQuery) {
    filter = clone(filter || {} as any);

    if (!filter.text) {
        filter.text = '';
    }

    if (!filter.filter) {
        filter.filter = { and: [] };
    }

    return filter;
}