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

export const addArtistThunk = createAsyncThunk<
    void,
    FormData,
    { rejectValue: string }
>("music-slice/add-artist", async (data, { rejectWithValue }) => {
    try {
        await musicApi.post(`/artists`, data);
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});

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

export const getArtistThunk = createAsyncThunk<
    IArtist,
    number,
    { rejectValue: string }
>("music-slice/get-artist-by-id", async (artistId, { rejectWithValue }) => {
    try {
        const result = await musicApi.get(`/artists/${artistId}`);

        return result.data;
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});

export const publishArtistThunk = createAsyncThunk<
    IArtist,
    number,
    { rejectValue: string }
>("music-slice/publish-artist", async (artistId, { rejectWithValue }) => {
    try {
        const result = await musicApi.delete(`/artists/${artistId}/publish`);

        return result.data;
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});

export const deleteArtistThunk = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>("music-slice/delete-artist", async (artistId, { rejectWithValue }) => {
    try {
        await musicApi.delete(`/artists/${artistId}`);

        return artistId;
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});

export const addAlbumThunk = createAsyncThunk<
    void,
    FormData,
    { rejectValue: string }
>("music-slice/add-album", async (data, { rejectWithValue }) => {
    try {
        await musicApi.post(`/albums`, data);
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

export const publishAlbumThunk = createAsyncThunk<
    IAlbum,
    number,
    { rejectValue: string }
>("music-slice/publish-album", async (albumId, { rejectWithValue }) => {
    try {
        const result = await musicApi.delete(`/albums/${albumId}/publish`);

        return result.data;
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});

export const deleteAlbumThunk = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>("music-slice/delete-album", async (albumId, { rejectWithValue }) => {
    try {
        await musicApi.delete(`/albums/${albumId}`);

        return albumId;
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

export const publishTrackThunk = createAsyncThunk<
    IAlbum,
    number,
    { rejectValue: string }
>("music-slice/publish-track", async (trackId, { rejectWithValue }) => {
    try {
        const result = await musicApi.delete(`/tracks/${trackId}/publish`);

        return result.data;
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;

        return rejectWithValue(error.response?.data?.error || "Unknown error");
    }
});

export const deleteTrackThunk = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>("music-slice/delete-track", async (trackId, { rejectWithValue }) => {
    try {
        await musicApi.delete(`/tracks/${trackId}`);

        return trackId;
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

export const logoutUserThunk = createAsyncThunk<
    string,
    void,
    { rejectValue: string }
>("music-slice/logout-user", async (_, { rejectWithValue }) => {
    try {
        const result = await musicApi.post<{ message: string }>(
            "/users/logout",
        );

        return result.data.message;
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
