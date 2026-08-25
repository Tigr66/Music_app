import { Select } from "antd";
import { FormField } from "./FormField";
import type { SelectProps } from "antd";
import type { BaseFormFieldProps } from "./form.types";

type FormSelectProps<T extends object> = BaseFormFieldProps<T> & SelectProps;

export const FormSelect = <T extends object>({
    name,
    label,
    required,
    rules,
    ...selectProps
}: FormSelectProps<T>) => {
    return (
        <FormField<T>
            name={name}
            label={label}
            required={required}
            rules={rules}
        >
            <Select {...selectProps} />
        </FormField>
    );
};
