import type { IAlbum } from "./IAlbum";
import type { IAlbumWithArtist } from "./IAlbumWithArtist";
import type { IArtist } from "./IArtist";
import type { ITrack } from "./ITrack";
import type { ITrackHistory } from "./ITrackHistory";
import type { IUser } from "./IUser";

export interface IMusicState {
    success: string | null;
    error: string | null;
    info: string | null;
    user: IUser | null;
    currentTrack: ITrack | null;
    artists: IArtist[];
    artistAlbums: IAlbum[];
    albumTracks: ITrack[];
    history: ITrackHistory[];
    isLoadingArtist: boolean;
    isLoadingArtists: boolean;
    isLoadingAlbum: boolean;
    isLoadingAlbums: boolean;
    isLoadingTracks: boolean;
    isLoadingHistory: boolean;
    isSending: boolean;
    isLoggingOut: boolean;
    currentArtist: IArtist | null;
    currentAlbum: IAlbumWithArtist | null;
}
