import { ChangeDetectionStrategy, Component, input, model, TemplateRef } from '@angular/core';
import { FilterLogical, SortField, SortOrder } from '../model';
import { Group } from "../group/group";
import { FilterOptions } from '../options';
import { ModelContext } from '../_internal';
import { Dropdown } from "../dropdown/dropdown";
import { FormsModule } from '@angular/forms';
import { TemplateContext } from '../template';

@Component({
    selector: 'filter-details',
    templateUrl: './details.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [Dropdown, Group, FormsModule],
})
export class Details {
    /**
     * The full model context.
     */
    context = input.required<ModelContext>();

    /**
     * Whether the autocomplete input is disabled.
     */
    disabled = input.required<boolean>();
    
    /**
     * The options
     */
    options = input.required<FilterOptions>();

    /**
     * The logical filter.
     */
    node = model.required<FilterLogical>();

    /**
     * The sorting.
     */
    sort = model.required<SortField[]>();

    /**
     * The template for value editors.
     */
    valueTemplate = input.required<TemplateRef<TemplateContext> | undefined>();

    _changeField(index: number, path: string) {
        this._updateSorting(sorting => {
            sorting[index] = { ...sorting[index], path };
        });
    }

    _changeMode(index: number, mode: SortOrder) {
        this._updateSorting(sorting => {
            sorting[index] = { ...sorting[index], order: mode };
        });
    }

    _removeSorting(index: number) {
        this._updateSorting(sorting => {
            sorting.splice(index, 1);
        });
    }

    _addSorting() {
        this._updateSorting(sorting => {
            sorting.push({ path: this.context().fields[0].value, order: 'ascending' });
        });
    }

    _updateSorting(update: (sorting: SortField[]) => void) {
        const sorting = [...this.sort()];

        update(sorting);
        this.sort.set(sorting);
    }
}