import type { IAlbum } from "./IAlbum";
import type { IAlbumWithArtist } from "./IAlbumWithArtist";
import type { IArtist } from "./IArtist";
import type { ITrack } from "./ITrack";
import type { IUser } from "./IUser";

export interface IMusicState {
    success: string | null;
    error: string | null;
    user: IUser | null;
    artists: IArtist[];
    artistAlbums: IAlbum[];
    albumTracks: ITrack[];
    isLoadingArtists: boolean;
    isLoadingAlbum: boolean;
    isLoadingAlbums: boolean;
    isLoadingTracks: boolean;
    isSending: boolean;
    currentArtist: IArtist | null;
    currentAlbum: IAlbumWithArtist | null;
}
