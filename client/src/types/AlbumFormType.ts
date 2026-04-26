import type { UploadFile } from "antd";

export type AlbumFormType = {
    title: string;
    artistId: number;
    cover: UploadFile[];
};
