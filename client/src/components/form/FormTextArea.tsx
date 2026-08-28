import { Input } from "antd";
import type { BaseFormFieldProps } from "./form.types";
import FormField from "./FormField";

const { TextArea } = Input;

type FormTextAreaProps<T extends object> = BaseFormFieldProps<T> &
    Omit<React.ComponentProps<typeof Input.TextArea>, "name">;

const FormTextArea = <T extends object>({
    name,
    label,
    required,
    rules,
    hidden,
    getValueFromEvent,
    ...textAreaProps
}: FormTextAreaProps<T>) => {
    return (
        <FormField<T>
            name={name}
            label={label}
            required={required}
            rules={rules}
            hidden={hidden}
            getValueFromEvent={getValueFromEvent}
        >
            <TextArea {...textAreaProps} />
        </FormField>
    );
};

export default FormTextArea;
