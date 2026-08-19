import { Album, Artist } from "../../generated/prisma/client";

export type CreateAlbumData = Omit<Album, "id" | "isPublished">;

export type UpdateAlbumData = Partial<Omit<Album, "id" | "artistId">>;

export type AlbumWithArtist = Album & {
    artist: Artist;
};

export type AlbumWithCount = Album & {
    count: number;
};

export type AlbumWithCountFromPrisma = Album & {
    _count: {
        tracks: number;
    };
};
