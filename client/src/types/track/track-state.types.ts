import type { Track } from "./track.types";

export interface ITrackState {
    tracks: Track[];
    currentTrack: Track | null;
    isSending: boolean;
    isLoading: boolean;
}
