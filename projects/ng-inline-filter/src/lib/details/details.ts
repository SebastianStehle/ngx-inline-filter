import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FilterLogical, SortField, SortMode } from '../model';
import { Group } from "../group/group";
import { Options } from '../options';
import { ModelContext } from '../utils';
import { Dropdown } from "../dropdown/dropdown";
import { FormsModule } from '@angular/forms';

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
    options = input.required<Options>();

    /**
     * The logical filter.
     */
    node = model.required<FilterLogical>();

    /**
     * The sorting.
     */
    sorting = model.required<SortField[]>();

    _changeField(index: number, field: string) {
        this._updateSorting(sorting => {
            sorting[index] = { ...sorting[index], field };
        });
    }

    _changeMode(index: number, mode: SortMode) {
        this._updateSorting(sorting => {
            sorting[index] = { ...sorting[index], mode };
        });
    }

    _removeSorting(index: number) {
        this._updateSorting(sorting => {
            sorting.splice(index, 1);
        });
    }

    _addSorting() {
        this._updateSorting(sorting => {
            sorting.push({ field: this.context().fields[0].value, mode: 'ascending' });
        });
    }

    _updateSorting(update: (sorting: SortField[]) => void) {
        const sorting = [...this.sorting()];

        update(sorting);
        this.sorting.set(sorting);
    }
}