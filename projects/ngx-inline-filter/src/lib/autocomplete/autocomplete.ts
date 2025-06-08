import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, input, model, output, signal, untracked, viewChild } from '@angular/core';
import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { FormsModule } from '@angular/forms';
import { debounce, DropdownOption, ManualMenuTrigger } from '../_internal';
import { FilterOptions } from '../options';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
    selector: 'filter-autocomplete',
    templateUrl: './autocomplete.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CdkMenu, CdkMenuItem, ManualMenuTrigger, FormsModule],
})
export class Autocomplete {
    /**
     * The sorted available fields.
     */
    fields = input<ReadonlyArray<DropdownOption>>([]);
    
    /**
     * The value.
     */
    value = model<string>();

    /**
     * Whether the autocomplete input is disabled.
     */
    disabled = input(false);

    /**
     * When a field is selected.
     */
    fieldSelect = output<string>();

    /**
     * When the delete button is pressed, but there is nothing to delete anymore.
     */
    delete = output();

    /**
     * The container element.
     */
    container = input.required<any>();
                    
    /**
     * The options.
     */
    options = input.required<FilterOptions>();

    valueSource = signal('');

    viewInput = viewChild<ElementRef<HTMLInputElement>>('input');
    viewMenu = viewChild(ManualMenuTrigger);

    searchText = computed(() => this.valueSource().toUpperCase());
    searchItems = computed(() => filterItems(this.fields(), this.searchText()));
    searchResult = debounce(this.searchItems);
    
    constructor() {
        effect(() => {
            this.valueSource.set(this.value() || '');
        });

        effect(() => {
            setTimeout(() => {
                this.scrollIntoView();
            });
        });
        
        effect(() => {
            const trigger = this.viewMenu();
            const fields = this.searchItems();

            untracked(() => {
                if (fields.length > 0) {
                    trigger?.open();
                }
            });
        });
    }

    scrollIntoView() {
        const container = this.container() as NgScrollbar;
        const input = this.viewInput();
        if (!container || !input) {
            return;
        }

        container.scrollToElement(input.nativeElement, { duration: 0 });
    }

    focus() {
        this.viewInput()?.nativeElement?.focus();
        this.scrollIntoView();
    }

    _updateValue(value: string) {
        this.valueSource.set(value);
        this.value.set(value);
    }

    _handleSelect(field: string) {
        this.valueSource.set('');
        this.fieldSelect.emit(field);
        this.focus();
    }

    _keyDown(event: KeyboardEvent) {
        this.scrollIntoView();
    
        const target: HTMLInputElement = event.currentTarget as any;
        if (event.key === 'Backspace' && target.value === '') {
            this.delete.emit();
        }

        if (event.key === 'Escape') {
            this.focus();
            this.viewMenu()?.close();
        }

        return true;
    }

    _handleClosed() {
        this.focus();
    }
}

const EMPTY_ITEMS: DropdownOption[] = [];
function filterItems(fields: ReadonlyArray<DropdownOption>, query: string) {
    if (query.length === 0) {
        return EMPTY_ITEMS;
    }

    const result = fields.filter(x => x.searchText.indexOf(query) >= 0);
    if (result.length === 0) {
        return EMPTY_ITEMS;
    }

    return result;
}