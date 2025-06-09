import { FilterField, FilterModel } from "./model";
import { FilterOptions } from "./options";

export interface TemplateContext {
    // The model.
    model: FilterModel;

    // The options.
    options: FilterOptions;

    // The field context.
    field: FilterField;

    // Indicates if runninng in grid mode.
    grid: boolean;

    // Disables the field.
    disabled: boolean;

    // The actual value of the field.
    value?: any;
    
    // Whenever the values has changed.
    onChange: (value: any) => void;

    // Whenever the focus has been lost.
    onBlur: (value: any) => void;
}