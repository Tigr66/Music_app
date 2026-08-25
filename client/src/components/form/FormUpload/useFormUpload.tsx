import type { UploadFile } from "antd";
import { useState } from "react";

const useFormUpload = () => {
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

    const onOpenChange = (open: boolean) => {
        setPreviewOpen(open);
        if (!open) setPreviewImage("");
    };

    return { previewOpen, previewImage, handlePreview, onOpenChange };
};

export default useFormUpload;
