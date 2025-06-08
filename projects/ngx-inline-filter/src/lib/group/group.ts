import { ChangeDetectionStrategy, Component, computed, ElementRef, input, model, output, TemplateRef, viewChild } from '@angular/core';
import { createComparison, FilterLogical, FilterNode, isLogicalAnd, isLogicalOr } from '../model';
import { FilterOptions } from '../options';
import { Node } from "../node/node";
import { clone, ModelContext } from '../_internal';
import { TemplateContext } from '../template';

@Component({
    selector: 'filter-group',
    templateUrl: './group.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [Node],
})
export class Group {
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
    options = input.required<FilterOptions>();

    /**
     * The level.
     */
    level = input.required<number>();

    /**
     * The logical filter.
     */
    node = model.required<FilterLogical>();

    /**
     * Whenever the node is removed.
     */
    nodeRemove = output<{ byButton: boolean }>();

    /**
     * The container element.
     */
    container = input<HTMLDivElement | null>();

    /**
     * To use a grid view.
     */
    grid = input(false);

    /**
     * The template for value editors.
     */
    valueTemplate = input<TemplateRef<TemplateContext> | undefined>();

    removeButton = viewChild<ElementRef<HTMLButtonElement>>('remove');

    isLogicalAnd = computed(() => isLogicalAnd(this.node()));
    isLogicalOr = computed(() => isLogicalOr(this.node()));

    children = computed(() => {
        const node = this.node();
        if (isLogicalAnd(node)) {
            return node.and;
        } else {
            return node.or;
        }
    });

    focusRemove() {
        this.removeButton()?.nativeElement?.focus();
    }

    _addComparison() {
        this._addNode(createComparison(this.context().model.fields[0]));
    }

    _addGroup() {
        this._addNode({ and: [] });
    }

    _addNode(child: FilterNode) {
        this._updateNode(node => {
            if (isLogicalAnd(node)) {
                node.and.push(child);
            } else {
                node.or.push(child);
            }
        });
    }

    _replaceNode(index: number, child: FilterNode) {
        this._updateNode(node => {
            if (isLogicalAnd(node)) {
                node.and[index] = child;
            } else {
                node.or[index] = child;
            }
        });
    }

    _removeNode(index: number) {
        this._updateNode(node => {
            if (isLogicalAnd(node)) {
                node.and.splice(index, 1);
            } else {
                node.or.splice(index, 1);
            }
        });
    }

    _toggleType() {
        this._updateNode(node => {
            if (isLogicalAnd(node)) {
                return { or: node.and };
            } else {
                return { and: node.or };
            }
        });
    }
    
    _updateNode(update: ((query: FilterLogical) => FilterLogical) | ((query: FilterLogical) => void)) {
        let node = clone(this.node());

        node = update(node) || node;
        this.node.set(node);
    }
    
    _handleRemove() {
        this.nodeRemove.emit({ byButton: false });
    }

    _handleRemoveKeyDown(event: KeyboardEvent) {
        if (event.code === 'Backspace') {
            this.nodeRemove.emit({ byButton: true });
        }
    }
}
