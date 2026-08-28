import { Input } from "antd";
import type { InputProps } from "antd";
import type { BaseFormFieldProps } from "./form.types";
import FormField from "./FormField";

type FormInputProps<T extends object> = BaseFormFieldProps<T> &
    Omit<InputProps, "name"> & {
        password?: boolean;
    };

const FormInput = <T extends object>({
    name,
    label,
    required,
    rules,
    password,
    hidden,
    getValueFromEvent,
    ...inputProps
}: FormInputProps<T>) => {
    return (
        <FormField<T>
            name={name}
            label={label}
            required={required}
            rules={rules}
            hidden={hidden}
            getValueFromEvent={getValueFromEvent}
        >
            {password ? (
                <Input.Password {...inputProps} />
            ) : (
                <Input {...inputProps} />
            )}
        </FormField>
    );
};

export default FormInput;
