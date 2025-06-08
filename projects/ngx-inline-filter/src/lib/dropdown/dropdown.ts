import { CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, input, model, output, signal, untracked, viewChild } from '@angular/core';
import { FilterOptions } from '../options';
import { FormsModule } from '@angular/forms';
import { CustomMenu, DropdownOption } from '../_internal';

@Component({
    selector: 'filter-dropdown',
    templateUrl: './dropdown.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CdkMenuItem, CdkMenuTrigger, CustomMenu, FormsModule],
})
export class Dropdown {
    /**
     * The options.
     */
    items = input.required<ReadonlyArray<Readonly<DropdownOption>>>();

    /**
     * The selected value.
     */
    value = model<string | undefined | null>();

    /**
     * To show as a button.
     */
    asButton = input(false);

    /**
     * Whether the autocomplete input is disabled.
     */
    disabled = input(false);

    /**
     * Indicates if a search input is shown.
     */
    showSearch = input(false);

    /**
     * Shows the option descriptions.
     */
    showDescription = input(false);
    
    /**
     * The class name.
     */
    class = input<string>('');
                
    /**
     * The options.
     */
    options = input.required<FilterOptions>();

    /**
     * The label that is used for type-ahead search.
     */
    typeaheadLabel = input('label');

    menu = viewChild(CustomMenu);

    searchInput = viewChild<ElementRef<HTMLInputElement>>('search');
    searchText = signal('');
    searchUpper = computed(() => this.searchText().toUpperCase());
    searchItems = computed(() => filterItems(this.items(), this.searchUpper()));

    button = viewChild<ElementRef<HTMLButtonElement>>('button');

    selectedItem = computed(() => {
        const items = this.items();
        const value = this.value();

        return value ? items.find(x => x.value === value) : undefined;
    });

    selectedIndex = computed(() => {
        const items = this.items();
        const value = this.value();

        return value ? items.findIndex(x => x.value === value) : -1;
    });

    constructor() {
        effect(() => {
            const menu = this.menu();
            if (!menu) {
                return;
            }

            untracked(() => {
                menu.focusItem(this.selectedIndex(), 'keyboard');
            });
        });

        effect(() => {
            const search = this.searchInput();
            if (!search) {
                return;
            }

            untracked(() => {
                search.nativeElement.focus();
            });
        });
    }

    focus() {
        this.button()?.nativeElement?.focus();
    }
}


const EMPTY_ITEMS: DropdownOption[] = [];
function filterItems(items: ReadonlyArray<DropdownOption>, query: string) {
    if (query.length === 0) {
        return items;
    }

    const result = items.filter(x => x.searchText.indexOf(query) >= 0);
    if (result.length === 0) {
        return EMPTY_ITEMS;
    }

    return result;
}