import { AutoComplete } from "antd";
import type { AutoCompleteProps } from "antd";
import type { BaseFormFieldProps } from "./form.types";
import { FormField } from "./FormField";

type FormAutoCompleteProps<T extends object> = BaseFormFieldProps<T> &
    Omit<AutoCompleteProps, "name">;

export const FormAutoComplete = <T extends object>({
    name,
    label,
    required,
    rules,
    ...autoCompleteProps
}: FormAutoCompleteProps<T>) => {
    return (
        <FormField<T>
            name={name}
            label={label}
            required={required}
            rules={rules}
        >
            <AutoComplete {...autoCompleteProps} />
        </FormField>
    );
};
