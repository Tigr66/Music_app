import type { ITrackHistoryState } from "@/types/track-history/track-history-state.types";
import { createSlice } from "@reduxjs/toolkit";
import { addHistoryThunk, getHistoryThunk } from "./trackHistoryThunks";

const initialState: ITrackHistoryState = {
    trackHistory: [],
    isSending: false,
    isLoading: false,
};

const trackHistorySlice = createSlice({
    name: "trackHistory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addHistoryThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(addHistoryThunk.fulfilled, (state) => {
                state.isSending = false;
            })
            .addCase(addHistoryThunk.rejected, (state) => {
                state.isSending = false;
            })
            .addCase(getHistoryThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHistoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trackHistory = action.payload;
            })
            .addCase(getHistoryThunk.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const {} = trackHistorySlice.actions;

export default trackHistorySlice.reducer;
