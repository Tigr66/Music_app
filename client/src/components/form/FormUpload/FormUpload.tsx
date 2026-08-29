import type { UploadProps } from "antd";
import { Upload, Image } from "antd";
import type { BaseFormFieldProps } from "../form.types";
import useFormUpload from "./useFormUpload";
import FormField from "../FormField";

type FormUploadProps<T extends object> = BaseFormFieldProps<T> &
    Omit<UploadProps, "name">;

const FormUpload = <T extends object>({
    name,
    label,
    required,
    rules,
    valuePropName,
    getValueFromEvent,
    ...uploadProps
}: FormUploadProps<T>) => {
    const { previewOpen, previewImage, handlePreview, onOpenChange } =
        useFormUpload();

    return (
        <FormField
            name={name}
            label={label}
            required={required}
            rules={rules}
            valuePropName={valuePropName}
            getValueFromEvent={getValueFromEvent}
        >
            <Upload
                {...uploadProps}
                beforeUpload={() => false}
                maxCount={1}
                onPreview={handlePreview}
                listType="picture-card"
                accept="image/jpeg"
            >
                + Upload
            </Upload>
            {previewOpen && (
                <Image
                    style={{ display: "none" }}
                    preview={{
                        open: previewOpen,
                        onOpenChange,
                    }}
                    src={previewImage}
                />
            )}
        </FormField>
    );
};

export default FormUpload;
