import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal, viewChild } from '@angular/core';
import { FilterOptions } from '../options';
import { FormsModule } from '@angular/forms';
import { DropdownOption } from '../_internal';
import { Menu } from '../menu/menu';

@Component({
    selector: 'filter-dropdown',
    templateUrl: './dropdown.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CdkMenuTrigger, Menu, FormsModule],
})
export class Dropdown {
    /**
     * The items.
     */
    items = input.required<ReadonlyArray<Readonly<DropdownOption>>>();

    /**
     * The selected value.
     */
    value = input<string | undefined | null>();

    /**
     * Whenever the value has changed.
     */
    valueChange = output<string>();

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

    valueSource = signal<string | null | undefined>(null);

    selectedItem = computed(() => {
        const items = this.items();
        const value = this.valueSource();

        return value ? items.find(x => x.value === value) : undefined;
    });

    constructor() {
        effect(() => {
            this.valueSource.set(this.value());
        });
    }
    
    _handleValue(option: DropdownOption) {
        this.valueSource.set(option.value);
        this.valueChange.emit(option.value);
    }
}