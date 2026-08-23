import type { Artist } from "./artist.types";

export interface IArtistState {
    artists: Artist[];
    currentArtist: Artist | null;
    isSending: boolean;
    isLoading: boolean;
}
