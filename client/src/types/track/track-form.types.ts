export type TrackFormType = {
    title: string;
    artistId: string;
    albumId: string;
    duration: number;
    youtubeUrl: string;
};

export type CreateTrackType = Omit<TrackFormType, "artistId">;
