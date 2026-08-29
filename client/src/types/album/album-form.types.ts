import type { UploadFile } from "antd";

export type AlbumFormType = {
    title: string;
    artistId: string;
    cover: UploadFile[];
};
