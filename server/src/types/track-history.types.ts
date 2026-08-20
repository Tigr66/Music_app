export type CreateTrackHistoryData = {
    trackId: string;
    userId: string;
};

export type TrackHistoryWithDetails = {
    id: string;
    artistName: string;
    trackTitle: string;
    datetime: Date;
};

export type TrackHistoryWithDetailsRepository = {
    id: string;
    track: {
        title: string;
        album: {
            artist: {
                name: string;
            };
        };
    };
    datetime: Date;
};
