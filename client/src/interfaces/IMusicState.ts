import type { IArtist } from "./IArtist";

export interface IMusicState {
    error: string | null;
    isLoading: boolean,
    artists: IArtist[];
}
