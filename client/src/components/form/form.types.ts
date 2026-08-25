import type { FormItemProps, SelectProps } from "antd";

export type FormFieldName<T extends object> = Extract<keyof T, string>;
export type SelectOption = NonNullable<SelectProps["options"]>[number];

export interface BaseFormFieldProps<T extends object> {
    name: FormFieldName<T>;
    label?: string;
    required?: boolean;
    rules?: FormItemProps["rules"];
    hidden?: boolean;
    valuePropName?: FormItemProps["valuePropName"];
    getValueFromEvent?: FormItemProps["getValueFromEvent"];
}
