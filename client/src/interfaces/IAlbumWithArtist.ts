import type { IArtist } from "./IArtist";

export interface IAlbumWithArtist {
    id: number;
    artistId: number;
    title: string;
    cover: string;
    publishedAt: Date;
    userId: number;
    isPublished: boolean;

    artist: IArtist;
}
