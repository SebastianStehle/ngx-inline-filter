import { ChangeDetectionStrategy, Component, computed, forwardRef, input, output, viewChild } from '@angular/core';
import { FilterLogical, isLogical, FilterNode, FilterComparison, FilterNegation, FilterField, FilterOperator, FilterModel } from '../model';
import { Options } from '../options';
import { Comparison } from '../comparison/comparison';
import { Group } from '../group/group';
import { ModelContext } from '../utils';

@Component({
    selector: 'filter-node',
    templateUrl: './node.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        forwardRef(() => Comparison),
        forwardRef(() => Group),
    ],
})
export class Node {
    /**
     * The full model context.
     */
    context = input.required<ModelContext>();

    /**
     * Whether the autocomplete input is disabled.
     */
    disabled = input.required<boolean>();

    /**
     * The options.
     */
    options = input.required<Options>();

    /**
     * The level.
     */
    level = input.required<number>();

    /**
     * The logical filter.
     */
    node = input.required<FilterNode>();

    /**
     * The logical filter.
     */
    nodeChange = output<FilterNode>();

    /**
     * Whenever the node is removed.
     */
    nodeRemove = output<{ byButton: boolean }>();

    /**
     * The container element.
     */
    container = input<any>();

    /**
     * To use a grid view.
     */
    grid = input(false);

    actualGroup = computed<FilterLogical | null>(() => {
        const node = this.node();
        if (isLogical(node)) {
            return node;
        }

        return null;
    });

    actualComparison = computed<FilterComparison | FilterNegation | null>(() => {
        const node = this.node();
        if (!isLogical(node)) {
            return node as FilterComparison | FilterNegation;
        }

        return null;
    });

    elementComparison = viewChild<any>('comparison');
    elementGroup = viewChild<any>('group');

    focusRemove() {
        this.elementComparison()?.focusRemove();
        this.elementGroup()?.focusRemove();
    }
}
