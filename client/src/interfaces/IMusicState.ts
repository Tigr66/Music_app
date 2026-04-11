import type { IAlbum } from "./IAlbum";
import type { IArtist } from "./IArtist";
import type { ITrack } from "./ITrack";

export interface IMusicState {
    error: string | null;
    isLoading: boolean;
    artists: IArtist[];
    artistAlbums: IAlbum[];
    albumTracks: ITrack[];
    currentArtist: IArtist | null;
    currentAlbum: IAlbum | null;
}
