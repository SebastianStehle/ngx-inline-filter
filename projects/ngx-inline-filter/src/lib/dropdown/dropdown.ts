import { CdkMenuTrigger } from '@angular/cdk/menu';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    input,
    output,
    signal,
    viewChild,
} from '@angular/core';
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
    readonly items = input.required<ReadonlyArray<Readonly<DropdownOption>>>();

    /**
     * The selected value.
     */
    readonly value = input<string | undefined | null>();

    /**
     * Whenever the value has changed.
     */
    readonly valueChange = output<string>();

    /**
     * Whether the autocomplete input is disabled.
     */
    readonly disabled = input(false);

    /**
     * Indicates if a search input is shown.
     */
    readonly showSearch = input(false);

    /**
     * Shows the option descriptions.
     */
    readonly showDescription = input(false);

    /**
     * The class name.
     */
    readonly class = input<string>('');

    /**
     * The options.
     */
    readonly options = input.required<FilterOptions>();

    /**
     * The label that is used for type-ahead search.
     */
    readonly typeaheadLabel = input('label');

    valueSource = signal<string | null | undefined>(null);

    readonly selectedItem = computed(() => {
        const items = this.items();
        const value = this.valueSource();

        return value ? items.find((x) => x.value === value) : undefined;
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
