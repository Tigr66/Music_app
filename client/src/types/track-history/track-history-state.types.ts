import type { TrackHistory } from "./track-history.types";

export interface ITrackHistoryState {
    trackHistories: TrackHistory[];
    isSending: boolean;
    isLoading: boolean;
}
