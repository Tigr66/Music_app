import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { ITrack } from "../../interfaces/ITrack";
import type { ITrackHistory } from "../../interfaces/ITrackHistory";
import { musicApi } from "../../api/musicApi";

export const addTrackThunk = createAsyncThunk<
    void,
    Omit<ITrack, "id" | "number" | "userId" | "isPublished">,
    { rejectValue: string }
>("music-slice/add-track", async (data, { rejectWithValue }) => {
    try {
        await musicApi.post(`/tracks`, data);
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
        const result = await musicApi.post(`/tracks/${trackId}/publish`);

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

