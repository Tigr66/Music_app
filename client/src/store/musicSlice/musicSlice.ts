import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    getAlbumById,
    getAlbumTracksThunk,
    getArtistAlbumsThunk,
    getArtistsThunk,
} from "./musicThunks";
import type { IMusicState } from "../../interfaces/IMusicState";
import type { IAlbumWithArtist } from "../../interfaces/IAlbumWithArtist";

const initialState: IMusicState = {
    error: null,
    artists: [],
    artistAlbums: [],
    albumTracks: [],
    isLoadingArtists: false,
    isLoadingAlbum: false,
    isLoadingAlbums: false,
    isLoadingTracks: false,
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
        setCurrentArtist: (state, action: PayloadAction<number | null>) => {
            if (action.payload === null) {
                state.currentArtist = null;
                return;
            }

            const artist = state.artists.find((a) => a.id === action.payload);
            if (artist) state.currentArtist = artist;
        },
        setCurrentAlbum: (
            state,
            action: PayloadAction<IAlbumWithArtist | null>,
        ) => {
            state.currentAlbum = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getArtistsThunk.pending, (state) => {
                state.isLoadingArtists = true;
                state.error = null;
            })
            .addCase(getArtistsThunk.fulfilled, (state, action) => {
                state.isLoadingArtists = false;
                state.artists = action.payload;
            })
            .addCase(getArtistsThunk.rejected, (state, action) => {
                state.isLoadingArtists = false;
                state.error = action.payload || "Error with getting artists";
            })
            .addCase(getArtistAlbumsThunk.pending, (state) => {
                state.isLoadingAlbums = true;
                state.error = null;
            })
            .addCase(getArtistAlbumsThunk.fulfilled, (state, action) => {
                state.isLoadingAlbums = false;
                state.artistAlbums = action.payload;
            })
            .addCase(getArtistAlbumsThunk.rejected, (state, action) => {
                state.isLoadingAlbums = false;
                state.error = action.payload || "Error with getting albums";
            })
            .addCase(getAlbumById.pending, (state) => {
                state.isLoadingAlbum = true;
                state.error = null;
            })
            .addCase(getAlbumById.fulfilled, (state, action) => {
                state.isLoadingAlbum = false;
                state.currentAlbum = action.payload;
            })
            .addCase(getAlbumById.rejected, (state, action) => {
                state.isLoadingAlbum = false;
                state.error = action.payload || "Error with getting albums";
            })
            .addCase(getAlbumTracksThunk.pending, (state) => {
                state.isLoadingTracks = true;
                state.error = null;
            })
            .addCase(getAlbumTracksThunk.fulfilled, (state, action) => {
                state.isLoadingTracks = false;
                state.albumTracks = action.payload;
            })
            .addCase(getAlbumTracksThunk.rejected, (state, action) => {
                state.isLoadingTracks = false;
                state.error = action.payload || "Error with getting albums";
            });
    },
});

export const { clearError, setCurrentArtist, setCurrentAlbum } =
    musicSlice.actions;

export default musicSlice.reducer;
