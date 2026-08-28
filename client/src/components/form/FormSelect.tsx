import { Select } from "antd";
import type { SelectProps } from "antd";
import type { BaseFormFieldProps } from "./form.types";
import FormField from "./FormField";

type FormSelectProps<T extends object> = BaseFormFieldProps<T> & SelectProps;

const FormSelect = <T extends object>({
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

export default FormSelect;
