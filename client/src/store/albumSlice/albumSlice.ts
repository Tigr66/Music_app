import type { IAlbumState } from "@/types/album/album-state.types";
import type { AlbumWithArtist } from "@/types/album/album.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    addAlbumThunk,
    deleteAlbumThunk,
    getAlbumByIdThunk,
    getArtistAlbumsThunk,
    publishAlbumThunk,
} from "./albumThunks";

const initialState: IAlbumState = {
    artistAlbums: [],
    currentAlbum: null,
    isSending: false,
    isLoading: false,
};

const albumSlice = createSlice({
    name: "album",
    initialState,
    reducers: {
        setCurrentAlbum: (
            state,
            action: PayloadAction<AlbumWithArtist | null>,
        ) => {
            state.currentAlbum = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addAlbumThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(addAlbumThunk.fulfilled, (state) => {
                state.isSending = false;
            })
            .addCase(addAlbumThunk.rejected, (state) => {
                state.isSending = false;
            })

            .addCase(getAlbumByIdThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAlbumByIdThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentAlbum = action.payload;
            })
            .addCase(getAlbumByIdThunk.rejected, (state) => {
                state.isLoading = false;
                state.currentAlbum = null;
            })

            .addCase(getArtistAlbumsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getArtistAlbumsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.artistAlbums = action.payload;
            })
            .addCase(getArtistAlbumsThunk.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(publishAlbumThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(publishAlbumThunk.fulfilled, (state, action) => {
                state.isSending = false;
                const index = state.artistAlbums.findIndex(
                    (a) => a.id === action.payload.id,
                );
                if (index === -1) return;
                state.artistAlbums[index].isPublished = true;
            })
            .addCase(publishAlbumThunk.rejected, (state) => {
                state.isSending = false;
            })

            .addCase(deleteAlbumThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(deleteAlbumThunk.fulfilled, (state, action) => {
                state.isSending = false;
                state.artistAlbums = state.artistAlbums.filter(
                    (a) => a.id !== action.payload,
                );
            })
            .addCase(deleteAlbumThunk.rejected, (state) => {
                state.isSending = false;
            });
    },
});

export const { setCurrentAlbum } = albumSlice.actions;

export default albumSlice.reducer;
