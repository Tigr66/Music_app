import type { UploadProps } from "antd";
import { Upload, Image } from "antd";
import { FormField } from "../FormField";
import useFormUpload from "./useFormUpload";
import type { BaseFormFieldProps } from "../form.types";

type FormUploadProps<T extends object> = BaseFormFieldProps<T> &
    Omit<UploadProps, "name">;

const FormUpload = <T extends object>({
    name,
    label,
    required,
    rules,
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
            getValueFromEvent={getValueFromEvent}
        >
            <Upload
                {...uploadProps}
                beforeUpload={() => false}
                maxCount={1}
                onPreview={handlePreview}
                listType="picture-card"
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
