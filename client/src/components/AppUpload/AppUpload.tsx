import { Upload, Image } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { useState } from "react";

const AppUpload = (props: UploadProps) => {
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>("");

    const handlePreview = async (file: UploadFile) => {
        let src = file.url as string;

        if (!src && file.originFileObj) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as File);
                reader.onload = () => resolve(reader.result as string);
            });
        }

        setPreviewImage(src);
        setPreviewOpen(true);
    };

    return (
        <>
            <Upload
                {...props}
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
                        onOpenChange: (v) => {
                            setPreviewOpen(v);
                            if (!v) setPreviewImage("");
                        },
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default AppUpload;
