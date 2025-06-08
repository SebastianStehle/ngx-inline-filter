import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, input, model, output, signal, TemplateRef, untracked, viewChild, ViewContainerRef } from '@angular/core';
import {  FieldComponent, FilterComparison, FilterField, FilterModel, FilterNegation, FilterNode, FilterOperator, isEmptyOperator, isNegation } from '../model';
import { FormsModule } from '@angular/forms';
import { Dropdown } from "../dropdown/dropdown";
import { FilterOptions } from '../options';
import { clone, ModelContext } from '../_internal';
import { TemplateContext } from '../template';
import { NgTemplateOutlet } from '@angular/common';

type Node = FilterComparison | FilterNegation;

@Component({
    selector: 'filter-comparison',
    templateUrl: './comparison.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [Dropdown, FormsModule, NgTemplateOutlet],
})
export class Comparison {
    /**
     * The full model context.
     */
    context = input.required<ModelContext>();

    /**
     * Whether the autocomplete input is disabled.
     */
    disabled = input.required<boolean>();

    /**
     * The actual description of the filter.
     */
    node = model.required<Node>();

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
     * The options.
     */
    options = input.required<FilterOptions>();

    /**
     * The template for value editors.
     */
    valueTemplate = input<TemplateRef<TemplateContext> | undefined>();

    comparison = computed(() => {
        const node = this.node();
        if (isNegation(node)) {
            return node.not;
        } else {
            return node;
        }
    });

    field = computed(() => {
        const path = this.comparison().path;
        return this.context().model.fields.find(x => x.path === path) as FilterField | undefined;
    });

    fieldArguments = computed(() => this.field()?.args);
    fieldComponent = computed(() => this.field()?.component);

    removeButton = viewChild<ElementRef<HTMLButtonElement>>('remove');

    valueContainer = viewChild<ViewContainerRef, ViewContainerRef>('value', { read: ViewContainerRef });
    valueComponent = signal<FieldComponent | null>(null);

    isNegated = computed(() => isNegation(this.node()));
    isEmpty = computed(() => isEmptyOperator(this.comparison().op, this.context().model));

    viewContext = computed(() => {
        const field = this.field();
        if (!field) {
            return null;
        }

        return { 
            disabled: this.disabled(),
            field,
            model: this.context().model,
            onBlur: () => {},
            onChange: value => this._changeValue(value),
            options: this.options(),
        } as TemplateContext;
    });

    constructor() {
        effect(onCleanup => {
            const valueContainer = this.valueContainer();
            if (!valueContainer) {
                return;
            }

            const componentType = this.fieldComponent();
            if (!componentType) {
                return;
            }

            const component = valueContainer.createComponent(componentType);
            
            this.valueComponent.set(component.instance);
            onCleanup(() => component.destroy());
        });
        
        effect(() => {
            const component = this.valueComponent();
            const args = this.fieldArguments();
            untracked(() => component?.updateArgs?.(args));
        });
        
        effect(() => {
            const component = this.valueComponent();
            const options = this.options();
            untracked(() => component?.updateOptions?.(options));
        });

        effect(() => {
            const component = this.valueComponent();
            const model = this.context().model;
            untracked(() => component?.updateModel?.(model));
        })
        
        effect(() => {
            const component = this.valueComponent();
            const value = this.comparison()?.value;
            untracked(() => component?.writeValue?.(value));
        });
        
        effect(() => {
            const component = this.valueComponent();
            const disabled = this.disabled();
            untracked(() => component?.setDisabledState?.(disabled));
        });

        effect(() => {
            if (this.isEmpty()) {
                this.valueComponent.set(null);
            }
        });

        effect(onCleanup => {
            const component = this.valueComponent();
            if (!component) {
                return;
            }

            untracked(() => {
                component.registerOnChange((value: any) => {
                    this._changeValue(value);
                });
            });

            onCleanup(() => {
                component.registerOnChange(null);
                component.registerOnTouched(null);
            });
        });
    }

    focusRemove() {
        this.removeButton()?.nativeElement?.focus();
    }

    _changePath(path: string) {
        this._updateNode(node => {
            if (isNegation(node)) {
                node.not.path = path;
            } else {
                node.op = path;
            }
        });
    }

    _changeValue(value: any) {
        this._updateNode(node => {
            if (isNegation(node)) {
                node.not.value = value;
            } else {
                node.value = value;
            }
        });
    }

    _changeOperator(op: string) {
        this._updateNode(node => {
            if (isNegation(node)) {
                node.not.op = op;
            } else {
                node.op = op;
            }
        });
    }

    _toggleType() {
        this._updateNode(node => {
            if (isNegation(node)) {
                return node.not;
            } else {
                return { not: node };
            }
        });
    }
        
    _updateNode(update: ((query: Node) => Node) | ((query: Node) => void)) {
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
