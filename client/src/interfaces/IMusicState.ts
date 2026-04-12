import type { IAlbum } from "./IAlbum";
import type { IAlbumWithArtist } from "./IAlbumWithArtist";
import type { IArtist } from "./IArtist";
import type { ITrack } from "./ITrack";

export interface IMusicState {
    error: string | null;
    artists: IArtist[];
    artistAlbums: IAlbum[];
    albumTracks: ITrack[];
    isLoadingArtists: boolean;
    isLoadingAlbum: boolean;
    isLoadingAlbums: boolean;
    isLoadingTracks: boolean;
    currentArtist: IArtist | null;
    currentAlbum: IAlbumWithArtist | null;
}
