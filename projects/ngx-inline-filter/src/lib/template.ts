import { FilterField, FilterModel } from "./model";
import { FilterOptions } from "./options";

export interface TemplateContext {
    // The model.
    model: FilterModel;

    // The options.
    options: FilterOptions;

    // The field context.
    field: FilterField;

    // Disables the field.
    disabled: boolean;

    // The actual value of the field.
    value?: any;
    
    // Whenever the values has changed.
    onChange: (value: any) => void;

    // Whenever the focus has been lost.
    onBlur: (value: any) => void;
}