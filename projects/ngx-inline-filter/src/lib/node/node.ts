import {
    ChangeDetectionStrategy,
    Component,
    computed,
    forwardRef,
    input,
    output,
    TemplateRef,
    viewChild,
} from '@angular/core';
import {
    FilterLogical,
    isLogical,
    FilterNode,
    FilterComparison,
    FilterNegation,
} from '../model';
import { FilterOptions } from '../options';
import { Comparison } from '../comparison/comparison';
import { Group } from '../group/group';
import { ModelContext } from '../_internal';
import { TemplateContext } from '../template';

@Component({
    selector: 'filter-node',
    templateUrl: './node.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [forwardRef(() => Comparison), forwardRef(() => Group)],
})
export class Node {
    /**
     * The full model context.
     */
    readonly context = input.required<ModelContext>();

    /**
     * Whether the autocomplete input is disabled.
     */
    readonly disabled = input.required<boolean>();

    /**
     * The options.
     */
    readonly options = input.required<FilterOptions>();

    /**
     * The level.
     */
    readonly level = input.required<number>();

    /**
     * The logical filter.
     */
    readonly node = input.required<FilterNode>();

    /**
     * The logical filter.
     */
    readonly nodeChange = output<FilterNode>();

    /**
     * Whenever the node is removed.
     */
    readonly nodeRemove = output<{ byButton: boolean }>();

    /**
     * The template for value editors.
     */
    readonly valueTemplate = input<TemplateRef<TemplateContext> | undefined>();

    /**
     * The container element.
     */
    readonly container = input<any>();

    /**
     * To use a grid view.
     */
    readonly grid = input(false);

    readonly actualGroup = computed<FilterLogical | null>(() => {
        const node = this.node();
        if (isLogical(node)) {
            return node;
        }

        return null;
    });

    readonly actualComparison = computed<FilterComparison | FilterNegation | null>(
        () => {
            const node = this.node();
            if (!isLogical(node)) {
                return node as FilterComparison | FilterNegation;
            }

            return null;
        },
    );

    readonly elementComparison = viewChild<any>('comparison');
    readonly elementGroup = viewChild<any>('group');

    focusValue() {
        this.elementComparison()?.focusValue();
    }

    focusRemove() {
        this.elementComparison()?.focusRemove();
        this.elementGroup()?.focusRemove();
    }
}
