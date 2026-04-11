import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IMusicState } from "../../interfaces/IMusicState";
import { getArtistAlbumsThunk, getArtistsThunk } from "./musicThunks";

const initialState: IMusicState = {
    error: null,
    artists: [],
    artistAlbums: [],
    isLoading: false,
    currentArtist: null,
};

const musicSlice = createSlice({
    name: "music-slice",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setCurrentArtist: (state, action: PayloadAction<number>) => {
            const artist = state.artists.find((a) => a.id === action.payload);
            if (artist) state.currentArtist = artist.name;
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
    },
});

export const { clearError, setCurrentArtist } = musicSlice.actions;

export default musicSlice.reducer;
