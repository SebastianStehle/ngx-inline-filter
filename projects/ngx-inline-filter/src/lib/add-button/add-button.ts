import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core';
import { FilterOptions } from '../options';
import { FormsModule } from '@angular/forms';
import { DropdownOption } from '../_internal';
import { Menu } from '../menu/menu';

@Component({
    selector: 'filter-add-button',
    templateUrl: './add-button.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CdkMenuTrigger, Menu, FormsModule],
})
export class AddButton {
    /**
     * The items.
     */
    items = input.required<ReadonlyArray<Readonly<DropdownOption>>>();

    /**
     * Whenever a value has been selected.
     */
    selected = output<string>();

    /**
     * Whether the autocomplete input is disabled.
     */
    disabled = input(false);
                
    /**
     * The options.
     */
    options = input.required<FilterOptions>();

    viewButton = viewChild<ElementRef<HTMLButtonElement>>('button');

    focus() {
        this.viewButton()?.nativeElement?.focus();
    }
    
    _handleValue(option: DropdownOption) {
        this.selected.emit(option.value);
    }
}