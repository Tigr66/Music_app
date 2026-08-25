import { Radio, type RadioGroupProps } from "antd";
import type { BaseFormFieldProps } from "./form.types";
import { FormField } from "./FormField";

type FormRadioGroupProps<T extends object> = BaseFormFieldProps<T> &
    Omit<RadioGroupProps, "name">;

export const FormRadioGroup = <T extends object>({
    name,
    label,
    required,
    rules,
    ...radioGroupProps
}: FormRadioGroupProps<T>) => {
    return (
        <FormField<T>
            name={name}
            label={label}
            required={required}
            rules={rules}
        >
            <Radio.Group {...radioGroupProps} />
        </FormField>
    );
};
