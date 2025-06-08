import { ControlValueAccessor } from "@angular/forms";
import { clone, isUndefined } from "./_internal";
import { Type } from "@angular/core";
import { FilterOptions } from "./options";

export interface FieldComponent<TValue = any, TArgs = any> extends ControlValueAccessor  {
    focus?(): void;
    registerOnChange(fn: ((value: TValue) => void) | null | undefined): void;
    registerOnTouched(fn:(() => void) | null | undefined): void;
    setDisabledState?(isDisabled: boolean): void;
    updateArgs?(args: TArgs): void;
    updateModel?(model: FilterModel): void;
    updateOptions?(options: FilterOptions): void;
    writeValue(value: TValue): void;
}

export interface FilterField<TArgs = any> {
    // The path of the field.
    path: string;

    // The allowed operators.
    operators: string[];

    // The label for the field.
    label: string;

    // The description for the field.
    description?: string;

    // The component args.
    args?: TArgs;

    // The default value.
    defaultValue?: any;

    // The component type.
    component?: Type<FieldComponent<TArgs>>;
}

export interface FilterOperator {
    // The value of the operator.
    value: string;

    // The name of the operator.
    label: string;

    // True if the operator is empty.
    isEmpty?: boolean;
}

export interface FilterModel {
    // The list of supported fields.
    fields: FilterField[];

    // The list of supported operators.
    operators: FilterOperator[];
}

export const EMPTY_FILTER_MODEL: FilterModel = Object.freeze({ fields: [], operators: [] });

export type SortOrder = 'ascending' | 'descending';
export type SortField = { path: string; order: SortOrder };

export type FilterNode = FilterComparison | FilterLogical | FilterNegation;
export type FilterLogical = FilterAnd | FilterOr;

export type FilterComparison = {
    // The full path to the property.
    path: string;

    // The operator.
    op: string;

    // The value.
    value: any;
};

export type FilterNegation = {
    // The negated filter.
    not: FilterComparison;
};

export type FilterAnd =  {
    // The child filters if the logical filter is a conjunction (AND).
    and: FilterNode[];
};

export type FilterOr =  {
    // The child filters if the logical filter is a disjunction (OR).
    or: FilterNode[];
};

export interface ComplexQuery {
    // The actual part.
    filter?: FilterLogical;

    // The sorting.
    sort?: SortField[];

    // The query text.
    fullText?: string;
}

export function isNegation(input: FilterNode): input is FilterNegation {
    return !!(input as any)['not'];
}

export function isLogicalOr(input: FilterNode): input is FilterOr {
    return !!(input as any)['or'];
}

export function isLogicalAnd(input: FilterNode): input is FilterAnd {
    return !!(input as any)['and'];
}

export function isLogical(input: FilterNode): input is FilterLogical {
    return isLogicalAnd(input) || isLogicalOr(input);
}

export function isComparison(input: FilterNode): input is FilterComparison {
    return !isNegation(input) && !isComparison(input);
}

export function createComparison(field: FilterField) {
    return { path: field.path, op: field.operators[0], value: field.defaultValue };
}

export function createAnd() {
    return { and: [] };
}

export function isEmptyOperator(operator: string, model: FilterModel) {
    return model.operators.find(x => x.value === operator)?.isEmpty === true;
}

export function isWellDefined(field: FilterComparison, model: FilterModel) {
    return isEmptyOperator(field.op, model) || (!isUndefined(field.value) && field.value !== '');
}