import type { UploadFile } from "antd";

export const extractFile = (fileList?: UploadFile[]) => fileList?.[0]?.originFileObj;
