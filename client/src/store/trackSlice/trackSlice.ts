import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITrackState } from "@/types/track/track-state.types";
import type { Track } from "@/types/track/track.types";
import {
    addTrackThunk,
    deleteTrackThunk,
    getAlbumTracksThunk,
    publishTrackThunk,
} from "./trackThunks";

const initialState: ITrackState = {
    tracks: [],
    currentTrack: null,
    isSending: false,
    isLoading: false,
};

const trackSlice = createSlice({
    name: "track",
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<Track | null>) => {
            state.currentTrack = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTrackThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(addTrackThunk.fulfilled, (state) => {
                state.isSending = false;
            })
            .addCase(addTrackThunk.rejected, (state) => {
                state.isSending = false;
            })
            .addCase(getAlbumTracksThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAlbumTracksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tracks = action.payload;
            })
            .addCase(getAlbumTracksThunk.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(publishTrackThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(publishTrackThunk.fulfilled, (state, action) => {
                state.isSending = false;
                const index = state.tracks.findIndex(
                    (a) => a.id === action.payload.id,
                );
                if (index === -1) return;
                state.tracks[index].isPublished = true;
            })
            .addCase(publishTrackThunk.rejected, (state) => {
                state.isSending = false;
            })
            .addCase(deleteTrackThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(deleteTrackThunk.fulfilled, (state, action) => {
                state.isSending = false;
                state.tracks = state.tracks.filter(
                    (a) => a.id !== action.payload,
                );
            })
            .addCase(deleteTrackThunk.rejected, (state) => {
                state.isSending = false;
            });
    },
});

export const { setCurrentTrack } = trackSlice.actions;

export default trackSlice.reducer;
