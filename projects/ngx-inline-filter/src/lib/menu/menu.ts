import { CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    input,
    model,
    output,
    signal,
    untracked,
    viewChild,
} from '@angular/core';
import { FilterOptions } from '../options';
import { FormsModule } from '@angular/forms';
import { CustomMenu, DropdownOption } from '../_internal';

@Component({
    selector: 'filter-menu',
    templateUrl: './menu.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CdkMenuItem, CustomMenu, FormsModule],
})
export class Menu {
    /**
     * The items.
     */
    readonly items = input.required<ReadonlyArray<Readonly<DropdownOption>>>();

    /**
     * The selected item.
     */
    readonly selectedItem = input<DropdownOption | null | undefined>();

    /**
     * Whenever a value has been selected.
     */
    readonly selected = output<DropdownOption>();

    /**
     * Indicates if a search input is shown.
     */
    readonly showSearch = input(false);

    /**
     * Shows the option descriptions.
     */
    readonly showDescription = input(false);

    /**
     * The options.
     */
    readonly options = input.required<FilterOptions>();

    /**
     * The label that is used for type-ahead search.
     */
    readonly typeaheadLabel = input('label');

    readonly viewMenu = viewChild(CustomMenu);

    readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('search');
    searchText = signal('');
    readonly searchUpper = computed(() => this.searchText().toUpperCase());
    readonly searchItems = computed(() => filterItems(this.items(), this.searchUpper()));

    constructor() {
        effect(() => {
            const menu = this.viewMenu();
            if (!menu) {
                return;
            }

            untracked(() => {
                const items = this.items();
                const item = this.selectedItem();
                if (!item) {
                    return;
                }

                const index = items.indexOf(item);
                menu.focusItem(index, 'keyboard');
            });
        });

        effect(() => {
            const search = this.searchInput();
            if (!search) {
                return;
            }

            untracked(() => {
                setTimeout(() => {
                    search.nativeElement.focus();
                });
            });
        });
    }

    _handleValue(option: DropdownOption) {
        this.selected.emit(option);
    }
}

const EMPTY_ITEMS: DropdownOption[] = [];
function filterItems(items: ReadonlyArray<DropdownOption>, query: string) {
    if (query.length === 0) {
        return items;
    }

    const result = items.filter((x) => x.searchText.indexOf(query) >= 0);
    if (result.length === 0) {
        return EMPTY_ITEMS;
    }

    return result;
}
