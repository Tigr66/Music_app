import { Album, Artist } from "../../generated/prisma/client";

export type CreateAlbumData = Omit<Album, "id" | "isPublished">;

export type AlbumWithArtist = Album & {
    artist: Artist;
};

export type AlbumWithCount = Album & {
    count: number;
};
