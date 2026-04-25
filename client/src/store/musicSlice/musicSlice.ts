import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    addHistoryThunk,
    getAlbumById,
    getAlbumTracksThunk,
    getArtistAlbumsThunk,
    getArtistsThunk,
    getArtistThunk,
    getHistoryThunk,
    loginUserThunk,
    logoutUserThunk,
    registerUserThunk,
} from "./musicThunks";
import type { IMusicState } from "../../interfaces/IMusicState";
import type { IAlbumWithArtist } from "../../interfaces/IAlbumWithArtist";
import type { ITrack } from "../../interfaces/ITrack";

const initialState: IMusicState = {
    success: null,
    error: null,
    info: null,
    user: null,
    currentTrack: null,
    artists: [],
    artistAlbums: [],
    albumTracks: [],
    history: [],
    isLoadingArtist: false,
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
        clearInfo: (state) => {
            state.info = null;
        },
        clearUser: (state) => {
            state.user = null;
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
        setCurrentTrack: (state, action: PayloadAction<ITrack | null>) => {
            state.currentTrack = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getArtistsThunk.pending, (state) => {
                state.isLoadingArtists = true;
            })
            .addCase(getArtistsThunk.fulfilled, (state, action) => {
                state.isLoadingArtists = false;
                state.artists = action.payload;
            })
            .addCase(getArtistsThunk.rejected, (state, action) => {
                state.isLoadingArtists = false;
                state.error = action.payload || "Error with getting artists";
            })
            .addCase(getArtistThunk.pending, (state) => {
                state.isLoadingArtist = true;
            })
            .addCase(getArtistThunk.fulfilled, (state, action) => {
                state.isLoadingArtist = false;
                state.currentArtist = action.payload;
            })
            .addCase(getArtistThunk.rejected, (state, action) => {
                state.isLoadingArtist = false;
                state.error = action.payload || "Error with getting artist";
            })
            .addCase(getArtistAlbumsThunk.pending, (state) => {
                state.isLoadingAlbums = true;
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
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.isSending = false;
                state.user = action.payload;
                state.success = "Welcome back!";
                if (action.payload.token) {
                    localStorage.setItem("user_token", action.payload.token);
                }
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload || "Error with login";
            })
            .addCase(logoutUserThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(logoutUserThunk.fulfilled, (state, action) => {
                state.isSending = false;
                state.success = action.payload;
                localStorage.removeItem("user_token");
                state.user = null;
            })
            .addCase(logoutUserThunk.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload || "Error with logout";
            })
            .addCase(addHistoryThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(addHistoryThunk.fulfilled, (state) => {
                state.isSending = false;
                state.info = "Added to history!";
            })
            .addCase(addHistoryThunk.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload || "Error with add history";
            })
            .addCase(getHistoryThunk.pending, (state) => {
                state.isLoadingHistory = true;
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

export const {
    clearError,
    setCurrentArtist,
    setCurrentAlbum,
    setCurrentTrack,
    clearSuccess,
    clearInfo,
    clearUser,
} = musicSlice.actions;

export default musicSlice.reducer;
