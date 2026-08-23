import type { Artist } from "../artist/artist.types";

export type Album = {
    id: string;
    artistId: string;
    title: string;
    cover: string;
    publishedAt: string;
    count: number;
    userId: string;
    isPublished: boolean;
};

export type AlbumWithArtist = Omit<Album, "count"> & {
    artist: Artist;
};
