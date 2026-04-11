export interface IAlbumWithCount {
    id: number;
    artistId: number;
    title: string;
    cover: string;
    publishedAt: Date;

    count: number;
}
