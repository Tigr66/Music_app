import type { TrackHistory } from "./track-history.types";

export interface ITrackHistoryState {
    trackHistory: TrackHistory[];
    isSending: boolean;
    isLoading: boolean;
}
