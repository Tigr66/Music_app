import { createSlice } from "@reduxjs/toolkit";
import type { IMusicState } from "../../interfaces/IMusicState";
import { getArtistAlbumsThunk, getArtistsThunk } from "./musicThunks";

const initialState: IMusicState = {
    error: null,
    artists: [],
    artistAlbums: [],
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
            state.artists = [];
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
            state.artistAlbums = [];
        });
        builder.addCase(getArtistAlbumsThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.artistAlbums = action.payload;
        });
        builder.addCase(getArtistAlbumsThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Error with getting albums";
        });
    },
});

export const { clearError } = musicSlice.actions;

export default musicSlice.reducer;
