import type { UploadChangeParam, UploadFile } from "antd/es/upload";

export const getPhoto = (e: UploadChangeParam<UploadFile>) => {
    return e.fileList;
};
