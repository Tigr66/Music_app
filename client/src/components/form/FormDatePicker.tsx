import { DatePicker } from "antd";
import { FormField } from "./FormField";
import type { DatePickerProps } from "antd";
import type { BaseFormFieldProps } from "./form.types";

type FormDatePickerProps<T extends object> = BaseFormFieldProps<T> &
    Omit<DatePickerProps, "name">;

export const FormDatePicker = <T extends object>({
    name,
    label,
    required,
    rules,
    hidden,
    ...datePickerProps
}: FormDatePickerProps<T>) => {
    return (
        <FormField<T>
            name={name}
            label={label}
            required={required}
            rules={rules}
            hidden={hidden}
        >
            <DatePicker style={{ width: "100%" }} {...datePickerProps} />
        </FormField>
    );
};
