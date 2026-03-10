import { CdkMenuItem } from '@angular/cdk/menu';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    input,
    output,
    signal,
    untracked,
    viewChild,
    viewChildren,
} from '@angular/core';
import { FilterOptions } from '../options';
import { FormsModule } from '@angular/forms';
import { CustomMenu, DropdownOption } from '../_internal';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
    selector: 'filter-menu',
    templateUrl: './menu.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CdkTrapFocus, CdkMenuItem, CustomMenu, FormsModule],
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

    readonly searchText = signal('');
    readonly searchUpper = computed(() => this.searchText().toUpperCase());
    readonly searchItems = computed(() =>
        filterItems(this.items(), this.searchUpper()),
    );

    readonly menuItems = viewChildren<ElementRef>('menuItem');

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
    }

    _handleValue(option: DropdownOption) {
        this.selected.emit(option);
    }

    _stopEnter(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
        }
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
