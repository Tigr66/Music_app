import { Album, Track } from "../../generated/prisma/client";

export type CreateTrackData = Omit<Track, "id" | "number" | "isPublished">;

export type CreateTrackRepositoryInput = CreateTrackData & { number: number };

export type TrackWithAlbum = Track & {
    album: Album;
};
