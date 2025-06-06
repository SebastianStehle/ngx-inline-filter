import { effect, signal, Signal } from "@angular/core";
import { FilterModel } from "./model";

export type DropdownOption = Readonly<{ value: string, label: string; description?: string; searchText: string }>;

export function clone<T>(lhs: T): T {
    const any: any = lhs;

    if (Array.isArray(lhs)) {
        const result = [];

        for (let i = 0; i < lhs.length; i++) {
            result[i] = clone(lhs[i]);
        }

        return result as any;
    } else if (isObject(lhs)) {
        const result: any = {};

        for (const key in any) {
            if (any.hasOwnProperty(key)) {
                result[key] = clone((lhs as any)[key]);
            }
        }

        return result as any;
    }

    return lhs;
}

export function isObject(value: any): value is Object {
    return value && typeof value === 'object' && value.constructor === Object;
}

export function isUndefined(value: any): value is undefined {
    return typeof value === 'undefined';
}

export type ModelContext = {
    fields: ReadonlyArray<DropdownOption>;
    model: FilterModel;
    operators: ReadonlyArray<DropdownOption>;
}

export function getFieldOptions(model: FilterModel): DropdownOption[] {
    return model.fields.map(f => ({ value: f.name, label: f.label, searchText: f.label.toUpperCase(), description: f.description }));
}

export function getOperatorOptions(model: FilterModel): DropdownOption[] {
    return model.operators.map(o => ({ value: o.name, label: o.label, searchText: o.label.toUpperCase() }));
}

export function scrollInViewY(parent: HTMLElement, target: HTMLElement, padding = 0) {
    if (!parent || !target) {
        return;
    }

    const parentRect = parent.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const body = document.body;

    const scrollOffset = (targetRect.top + body.scrollTop) - (parentRect.top + body.scrollTop);
    const scrollParent = parent.scrollTop;

    if (scrollOffset < 0) {
        parent.scrollTop = scrollParent + scrollOffset - padding;
    } else {
        const targetHeight = targetRect.height;
        const parentHeight = parentRect.height;

        if ((scrollOffset + targetHeight) > parentHeight) {
            parent.scrollTop = scrollParent + scrollOffset - parentHeight + targetHeight;
        }
    }
}

export function scrollInViewX(parent: HTMLElement, target: HTMLElement, padding = 0) {
    if (!parent || !target) {
        return;
    }

    const parentRect = parent.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const body = document.body;

    const scrollOffset = (targetRect.left + body.scrollLeft) - (parentRect.left + body.scrollLeft);
    const scrollParent = parent.scrollLeft;

    if (scrollOffset < 0) {
        parent.scrollLeft = scrollParent + scrollOffset - padding;
    } else {
        const targetWidth = targetRect.width;
        const parentWidth = parentRect.width;

        if ((scrollOffset + targetWidth) > parentWidth) {
            parent.scrollLeft = scrollParent + scrollOffset - parentWidth + targetWidth;
        }
    }
}

export function debounce<T>(source: Signal<T>, delay = 300): Signal<T> {
    const result = signal<T>(source());

    effect(onCleanUp => {
        const value = source();
        const timer = setTimeout(() => {
            result.set(value);
        }, delay);

        onCleanUp(() => clearTimeout(timer));
    });

    return result;
}