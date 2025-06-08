import { ChangeDetectionStrategy, Component, computed, effect, input, model, output, signal, TemplateRef, viewChild, viewChildren } from '@angular/core';
import { ComplexQuery, createComparison, FilterLogical, FilterModel, FilterNode, isLogical, isLogicalAnd, isLogicalOr, isNegation, SortField } from '../model';
import { Autocomplete } from "../autocomplete/autocomplete";
import { clone, getFieldOptions, getOperatorOptions, ModelContext, SameSize } from '../_internal';
import { Details } from "../details/details";
import { Node } from "../node/node";
import { OverlayModule } from '@angular/cdk/overlay';
import { FilterOptions } from '../options';
import { Dropdown } from "../dropdown/dropdown";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TemplateContext } from '../template';

const DEFAULT_QUERY: ComplexQuery = { filter: { and: [] }, fullText: '', sort: [] };

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
    options = input.required<FilterOptions>();

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
     * Where to show the button to switch the logical positon.
     */
    logicalSwitchPosition = input<'start' | 'end' | 'none'>('end');

    /**
     * A search is triggered.
     */
    search = output<ComplexQuery>();
    
    /**
     * The template for value editors.
     */
    valueTemplate = input<TemplateRef<TemplateContext>>();

    context = computed(() => {
        const model = this.model();
        return {
            fields: getFieldOptions(model),
            model,
            operators: getOperatorOptions(model),
        } as ModelContext;
    });

    cleanedQuery = computed(() => {
        const query = { ...this.query() };

        return {
            filter: query.filter || [],
            fullText: query.fullText || '',
            sort: query.sort || [],
        } as Required<ComplexQuery>;
    });

    isMenuOpen = signal(false);
    isLogicalAnd = computed(() => isLogicalAnd(this.cleanedQuery().filter));
    isLogicalOr = computed(() => isLogicalOr(this.cleanedQuery().filter));

    hasSorting = computed(() => this.cleanedQuery().sort.length > 0);
    hasLogical = computed(() => this.filterItems().find(x => isLogical(x) || isNegation(x)));

    filterNodes = viewChildren(Node);
    filterItems = computed(() => {
        const filter = this.cleanedQuery().filter;
        if (isLogicalAnd(filter)) {
            return filter.and;
        } else {
            return filter.or;
        }
    })

    queryInput = viewChild(Autocomplete);

    addButton = viewChild(Dropdown);

    constructor() {
        effect(() => {
            this.isMenuOpen.set(this.isExpanded());
        });
    }

    focus() {
        this.queryInput()?.focus();
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
            query.fullText = text;
        });
    }

    _changeFilter(filter: FilterLogical) {
        this._updateQuery(query => {
            query.filter = filter;
        });
    }

    _changeSort(sorting: SortField[]) {
        this._updateQuery(query => {
            query.sort = sorting;
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
    
    _addFilter(path: string, clearQuery: boolean) {
        const field = this.model().fields.find(x => x.path === path)!;
        
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

    _updateQuery(update: (query: Required<ComplexQuery>) => void) {
        const query = clone(this.cleanedQuery());

        update(query);
        this.query.set(query);
    }

    _handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.search.emit(this.query());
        }
    }
}