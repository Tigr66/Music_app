import { Checkbox } from "antd";
import { FormField } from "./FormField";
import type { CheckboxProps } from "antd";
import type { BaseFormFieldProps } from "./form.types";

type FormCheckboxProps<T extends object> = BaseFormFieldProps<T> &
    Omit<CheckboxProps, "name">;

export const FormCheckbox = <T extends object>({
    name,
    label,
    required,
    rules,
    hidden,
    children,
    ...checkboxProps
}: FormCheckboxProps<T>) => {
    return (
        <FormField<T>
            name={name}
            label={label}
            required={required}
            rules={rules}
            hidden={hidden}
            valuePropName="checked"
        >
            <Checkbox {...checkboxProps}>{children}</Checkbox>
        </FormField>
    );
};
