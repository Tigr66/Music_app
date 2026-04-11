import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    getAlbumTracksThunk,
    getArtistAlbumsThunk,
    getArtistsThunk,
} from "./musicThunks";
import type { IMusicState } from "../../interfaces/IMusicState";

const initialState: IMusicState = {
    error: null,
    artists: [],
    artistAlbums: [],
    albumTracks: [],
    isLoading: false,
    currentArtist: null,
    currentAlbum: null,
};

const musicSlice = createSlice({
    name: "music-slice",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrents: (state) => {
            state.currentAlbum = null;
            state.currentArtist = null;
        },
        setCurrentArtist: (state, action: PayloadAction<number>) => {
            const artist = state.artists.find((a) => a.id === action.payload);
            if (artist) state.currentArtist = artist;
        },
        setCurrentAlbum: (state, action: PayloadAction<number>) => {
            const album = state.artistAlbums.find(
                (a) => a.id === action.payload,
            );
            if (album) state.currentAlbum = album;
        },
    },
    extraReducers(builder) {
        builder.addCase(getArtistsThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getArtistsThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.artists = action.payload;
        });
        builder.addCase(getArtistsThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Error with getting artists";
        });
        builder.addCase(getArtistAlbumsThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getArtistAlbumsThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.artistAlbums = action.payload;
        });
        builder.addCase(getArtistAlbumsThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Error with getting albums";
        });
        builder.addCase(getAlbumTracksThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getAlbumTracksThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.albumTracks = action.payload;
        });
        builder.addCase(getAlbumTracksThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Error with getting albums";
        });
    },
});

export const { clearError, setCurrentArtist, setCurrentAlbum, clearCurrents } = musicSlice.actions;

export default musicSlice.reducer;
