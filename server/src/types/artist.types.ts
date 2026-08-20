import { Album, Artist } from "../../generated/prisma/client";

export type CreateArtistData = Omit<Artist, "id" | "isPublished">;

export type ArtistWithAlbums = Artist & {
    albums: Album[];
};
