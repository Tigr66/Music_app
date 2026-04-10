import { createSlice } from "@reduxjs/toolkit";
import type { IMusicState } from "../../interfaces/IMusicState";
import { getArtistsThunk } from "./musicThunks";

const initialState: IMusicState = {
    error: null,
    artists: [],
    isLoading: false,
};

const musicSlice = createSlice({
    name: "music-slice",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
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
    },
});

export const { clearError } = musicSlice.actions;

export default musicSlice.reducer;
