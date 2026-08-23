import type { Album, AlbumWithArtist } from "./album.types";

export interface IAlbumState {
    artistAlbums: Album[];
    currentAlbum: AlbumWithArtist | null;
    isSending: boolean;
    isLoading: boolean;
}
