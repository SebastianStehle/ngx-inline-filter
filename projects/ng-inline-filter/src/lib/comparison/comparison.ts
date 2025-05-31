import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, input, model, output, signal, untracked, viewChild, ViewContainerRef } from '@angular/core';
import { createComparison, FieldComponent, FilterComparison, FilterField, FilterModel, FilterNegation, FilterNode, FilterOperator, isEmptyOperator, isNegation } from '../model';
import { FormsModule } from '@angular/forms';
import { Dropdown } from "../dropdown/dropdown";
import { Options } from '../options';
import { clone, DropdownOption, ModelContext } from '../utils';
import { O } from '@angular/cdk/keycodes';

type Node = FilterComparison | FilterNegation;

@Component({
    selector: 'filter-comparison',
    templateUrl: './comparison.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, Dropdown],
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
    options = input.required<Options>();

    comparison = computed(() => {
        const node = this.node();
        if (isNegation(node)) {
            return node.not;
        } else {
            return node;
        }
    });

    field = computed(() => {
        const fieldName = this.comparison().field;
        return this.context().model.fields.find(x => x.name === fieldName) as FilterField | undefined;
    });

    fieldArguments = computed(() => this.field()?.args);
    fieldComponent = computed(() => this.field()?.component);

    removeButton = viewChild<ElementRef<HTMLButtonElement>>('remove');

    valueContainer = viewChild<ViewContainerRef, ViewContainerRef>('value', { read: ViewContainerRef });
    valueComponent = signal<FieldComponent | null>(null);

    isNegated = computed(() => isNegation(this.node()));
    isEmpty = computed(() => isEmptyOperator(this.comparison().op, this.context().model));

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

    _changeField(field: string) {
        this._updateNode(node => {
            if (isNegation(node)) {
                node.not.op = field;
            } else {
                node.op = field;
            }
        });
    }

    _changeValue(value: any) {
        this._updateNode(node => {
            if (isNegation(node)) {
                node.not.op = value;
            } else {
                node.op = value;
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
