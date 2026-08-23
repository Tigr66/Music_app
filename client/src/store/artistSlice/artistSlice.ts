import type { IArtistState } from "@/types/artist/artist-state.types";
import type { Artist } from "@/types/artist/artist.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    getArtistsThunk,
    deleteArtistThunk,
    getArtistThunk,
    publishArtistThunk,
    addArtistThunk,
} from "./artistThunks";

const initialState: IArtistState = {
    artists: [],
    currentArtist: null,
    isSending: false,
    isLoading: false,
};

const artistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {
        setCurrentArtist: (state, action: PayloadAction<Artist | null>) => {
            state.currentArtist = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addArtistThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(addArtistThunk.fulfilled, (state) => {
                state.isSending = false;
            })
            .addCase(addArtistThunk.rejected, (state) => {
                state.isSending = false;
            })
            .addCase(getArtistsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getArtistsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.artists = action.payload;
            })
            .addCase(getArtistsThunk.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getArtistThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getArtistThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentArtist = action.payload;
            })
            .addCase(getArtistThunk.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(publishArtistThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(publishArtistThunk.fulfilled, (state, action) => {
                state.isSending = false;
                const index = state.artists.findIndex(
                    (a) => a.id === action.payload.id,
                );
                if (index === -1) return;
                state.artists[index].isPublished = true;
            })
            .addCase(publishArtistThunk.rejected, (state) => {
                state.isSending = false;
            })
            .addCase(deleteArtistThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(deleteArtistThunk.fulfilled, (state, action) => {
                state.isSending = false;
                state.artists = state.artists.filter(
                    (a) => a.id !== action.payload,
                );
            })
            .addCase(deleteArtistThunk.rejected, (state) => {
                state.isSending = false;
            });
    },
});

export const { setCurrentArtist } = artistSlice.actions;

export default artistSlice.reducer;
