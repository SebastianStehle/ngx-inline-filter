import { ChangeDetectorRef, inject, signal } from "@angular/core";
import { FieldComponent } from "../model";
import { DefaultOptions, Options } from "../options";

export abstract class ValueBase<TValue, TArgs = any> implements FieldComponent<TValue, TArgs> {
    args = signal<TArgs | undefined>(undefined);
    disabled = signal(false);
    onChange: (value: TValue) => void = () => {};
    onTouched: () => void = () => {};
    options = signal(DefaultOptions);
    value = signal<TValue | undefined>(undefined);

    updateArgs(args: TArgs) {
        this.args.set(args);
    }

    updateOptions?(options: Options): void {
        this.options.set(options);
    }

    writeValue(value: TValue) {
        this.value.set(value);
    }

    registerOnChange(fn: ((value: TValue) => void) | null | undefined) {
        this.onChange = fn || (() => {});

    }
    registerOnTouched(fn:(() => void) | null | undefined) {
        this.onTouched = fn || (() => {})
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }
}
