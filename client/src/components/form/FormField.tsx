import { Form } from "antd";
import type { FormItemProps } from "antd";
import type { ReactNode } from "react";
import type { BaseFormFieldProps } from "./form.types";

type FormFieldProps<T extends object> = BaseFormFieldProps<T> &
    Omit<
        FormItemProps,
        "children" | "label" | "name" | "required" | "rules"
    > & {
        children: ReactNode;
    };

const FormField = <T extends object>({
    name,
    label,
    required,
    rules,
    children,
    ...formItemProps
}: FormFieldProps<T>) => {
    const requiredRule: FormItemProps["rules"] = required
        ? [
              {
                  required: true,
                  message: "Required field",
              },
          ]
        : [];

    return (
        <Form.Item
            name={name as FormItemProps["name"]}
            label={label}
            rules={[...(requiredRule ?? []), ...(rules ?? [])]}
            layout="vertical"
            {...formItemProps}
        >
            {children}
        </Form.Item>
    );
};

export default FormField;
