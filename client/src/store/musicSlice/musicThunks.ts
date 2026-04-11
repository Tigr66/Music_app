import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { IArtist } from "../../interfaces/IArtist";
import type { IAlbum } from "../../interfaces/IAlbum";
import type { ITrack } from "../../interfaces/ITrack";
import { musicApi } from "../../api/musicApi";

export const getArtistsThunk = createAsyncThunk<
    IArtist[],
    void,
    { rejectValue: string }
>("music-slice/get-artists", async (_, { rejectWithValue }) => {
    try {
        const result = await musicApi.get("/artists");

        return result.data;
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});

export const getArtistAlbumsThunk = createAsyncThunk<
    IAlbum[],
    number,
    { rejectValue: string }
>("music-slice/get-albums", async (artistId, { rejectWithValue }) => {
    try {
        const result = await musicApi.get("/albums", {
            params: {
                artist: artistId,
            },
        });

        return result.data;
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});

export const getAlbumTracksThunk = createAsyncThunk<
    ITrack[],
    number,
    { rejectValue: string }
>("music-slice/get-tracks", async (albumId, { rejectWithValue }) => {
    try {
        const result = await musicApi.get("/tracks", {
            params: {
                album: albumId,
            },
        });

        return result.data;
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});
