import { IArtist } from "./artist.interface";

export interface IAlbumWithArtist {
    id: number;
    artistId: number;
    title: string;
    cover: string;
    publishedAt: Date;

    artist: IArtist;
}
