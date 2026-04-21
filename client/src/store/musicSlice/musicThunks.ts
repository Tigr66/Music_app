import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { IArtist } from "../../interfaces/IArtist";
import type { IAlbum } from "../../interfaces/IAlbum";
import type { ITrack } from "../../interfaces/ITrack";
import type { IAlbumWithArtist } from "../../interfaces/IAlbumWithArtist";
import type { IUser } from "../../interfaces/IUser";
import type { IAuthUser } from "../../interfaces/IAuthUser";
import type { ITrackHistory } from "../../interfaces/ITrackHistory";
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

export const getAlbumById = createAsyncThunk<
    IAlbumWithArtist,
    number,
    { rejectValue: string }
>("music-slice/get-album-by-id", async (albumID, { rejectWithValue }) => {
    try {
        const result = await musicApi.get(`/albums/${albumID}`, {});

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

export const registerUserThunk = createAsyncThunk<
    void,
    IAuthUser,
    { rejectValue: string }
>("music-slice/register-user", async (newUser, { rejectWithValue }) => {
    try {
        await musicApi.post("/users", newUser);
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});

export const loginUserThunk = createAsyncThunk<
    IUser,
    IAuthUser,
    { rejectValue: string }
>("music-slice/login-user", async (newUser, { rejectWithValue }) => {
    try {
        const result = await musicApi.post("/users/sessions", newUser);

        return result.data;
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});

export const addHistoryThunk = createAsyncThunk<
    void,
    number,
    { rejectValue: string }
>("music-slice/add-history", async (trackId, { rejectWithValue }) => {
    try {
        await musicApi.post("/track_history", { trackId });
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});

export const getHistoryThunk = createAsyncThunk<
    ITrackHistory[],
    void,
    { rejectValue: string }
>("music-slice/get-history", async (_, { rejectWithValue }) => {
    try {
        const result = await musicApi.get("/track_history");

        return result.data;
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});
