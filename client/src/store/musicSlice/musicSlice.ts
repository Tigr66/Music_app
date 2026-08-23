import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    addAlbumThunk,
    addArtistThunk,
    addHistoryThunk,
    addTrackThunk,
    deleteAlbumThunk,
    deleteArtistThunk,
    deleteTrackThunk,
    getAlbumById,
    getAlbumTracksThunk,
    getArtistAlbumsThunk,
    getArtistsThunk,
    getArtistThunk,
    getHistoryThunk,
    publishAlbumThunk,
    publishArtistThunk,
    publishTrackThunk,
} from "./musicThunks";
import type { IMusicState } from "../../interfaces/IMusicState";
import type { IAlbumWithArtist } from "../../interfaces/IAlbumWithArtist";
import type { ITrack } from "../../interfaces/ITrack";
import type { IArtist } from "../../interfaces/IArtist";

const initialState: IMusicState = {
    currentTrack: null,
    history: [],
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
        setCurrentTrack: (state, action: PayloadAction<ITrack | null>) => {
            state.currentTrack = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(addTrackThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(addTrackThunk.fulfilled, (state) => {
                state.isSending = false;
                state.success = "Successfully added";
            })
            .addCase(addTrackThunk.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload || "Error adding artist";
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
            .addCase(publishTrackThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(publishTrackThunk.fulfilled, (state, action) => {
                state.isSending = false;
                const index = state.albumTracks.findIndex(
                    (a) => a.id === action.payload.id,
                );
                if (index === -1) return;
                state.albumTracks[index].isPublished = true;
                state.success = "Successfully published";
            })
            .addCase(publishTrackThunk.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload || "Error with publishing";
            })
            .addCase(deleteTrackThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(deleteTrackThunk.fulfilled, (state, action) => {
                state.isSending = false;
                state.albumTracks = state.albumTracks.filter(
                    (a) => a.id !== action.payload,
                );
                state.success = "Successfully deleted";
            })
            .addCase(deleteTrackThunk.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload || "Error with deleting";
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

export const { setCurrentAlbum, setCurrentTrack } = musicSlice.actions;

export default musicSlice.reducer;
