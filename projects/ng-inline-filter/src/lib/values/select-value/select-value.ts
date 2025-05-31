import { ChangeDetectionStrategy, Component, computed, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValueBase } from '../value-base';

type Option = { value: any, label: string, group: string };

@Component({
    selector: 'filter-select-value',
    templateUrl: './select-value.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule],
})
export class SelectValue extends ValueBase<number, Option[]> {
    input = viewChild<ElementRef<HTMLInputElement>>('input');

    tree = computed(() => {
        const options = this.args() || [];

        const treeGroups: { name?: string; children: Option[] }[] = [];
        const treeRoots: Option[] = [];

        for (const option of options) {
            if (option.group) {
                let group = treeGroups.find(x => x.name === option.group);

                if (!group) {
                    group = { name: option.group, children: [] };
                    treeGroups.push(group);
                }

                group.children.push(option);
            } else {
                treeRoots.push(option);
            }
        }

        return { groups: treeGroups, roots: treeRoots };
    });

    focus() {
        this.input()?.nativeElement.focus();
    }
}
