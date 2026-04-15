import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    addHistoryThunk,
    getAlbumById,
    getAlbumTracksThunk,
    getArtistAlbumsThunk,
    getArtistsThunk,
    getHistoryThunk,
    loginUserThunk,
    registerUserThunk,
} from "./musicThunks";
import type { IMusicState } from "../../interfaces/IMusicState";
import type { IAlbumWithArtist } from "../../interfaces/IAlbumWithArtist";

const initialState: IMusicState = {
    success: null,
    error: null,
    user: null,
    artists: [],
    artistAlbums: [],
    albumTracks: [],
    history: [],
    isLoadingArtists: false,
    isLoadingAlbum: false,
    isLoadingAlbums: false,
    isLoadingTracks: false,
    isLoadingHistory: false,
    isSending: false,
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
        clearSuccess: (state) => {
            state.success = null;
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
                state.success = null;
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
                state.success = null;
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
                state.success = null;
                state.error = null;
            })
            .addCase(getAlbumById.fulfilled, (state, action) => {
                state.isLoadingAlbum = false;
                state.currentAlbum = action.payload;
            })
            .addCase(getAlbumById.rejected, (state, action) => {
                state.isLoadingAlbum = false;
                state.error = action.payload || "Error with getting album";
            })
            .addCase(getAlbumTracksThunk.pending, (state) => {
                state.isLoadingTracks = true;
                state.success = null;
                state.error = null;
            })
            .addCase(getAlbumTracksThunk.fulfilled, (state, action) => {
                state.isLoadingTracks = false;
                state.albumTracks = action.payload;
            })
            .addCase(getAlbumTracksThunk.rejected, (state, action) => {
                state.isLoadingTracks = false;
                state.error = action.payload || "Error with getting tracks";
            })
            .addCase(registerUserThunk.pending, (state) => {
                state.isSending = true;
                state.error = null;
                state.success = null;
            })
            .addCase(registerUserThunk.fulfilled, (state) => {
                state.isSending = false;
                state.success = "Registration successful. Please log in";
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload || "Error with registrate";
            })
            .addCase(loginUserThunk.pending, (state) => {
                state.isSending = true;
                state.error = null;
                state.success = null;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.isSending = false;
                state.success = "Welcome back!";
                state.user = action.payload;
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload || "Error with login";
            })
            .addCase(addHistoryThunk.pending, (state) => {
                state.isSending = true;
                state.error = null;
                state.success = null;
            })
            .addCase(addHistoryThunk.fulfilled, (state) => {
                state.isSending = false;
                state.success = "Hearing!";
            })
            .addCase(addHistoryThunk.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload || "Error with add history";
            })
            .addCase(getHistoryThunk.pending, (state) => {
                state.isLoadingHistory = true;
                state.error = null;
                state.success = null;
            })
            .addCase(getHistoryThunk.fulfilled, (state, action) => {
                state.isLoadingHistory = false;
                state.history = action.payload;
            })
            .addCase(getHistoryThunk.rejected, (state, action) => {
                state.isLoadingHistory = false;
                state.error = action.payload || "Error with getting history";
            });
    },
});

export const { clearError, setCurrentArtist, setCurrentAlbum, clearSuccess } =
    musicSlice.actions;

export default musicSlice.reducer;
