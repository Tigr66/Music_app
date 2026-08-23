import type { UploadFile } from "antd";

export type ArtistFormType = {
    name: string;
    info: string;
    photo: UploadFile[];
};
