export interface IAlbumWithCount {
    id: number;
    artistId: number;
    title: string;
    cover: string;
    publishedAt: Date;
    userId: number;
    isPublished: boolean;

    count: number;
}
