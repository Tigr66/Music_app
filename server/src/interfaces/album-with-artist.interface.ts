import { IArtist } from "./artist.interface";

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
