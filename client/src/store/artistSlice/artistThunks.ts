import { musicApi } from "@/api/musicApi";
import { notifyError, notifySuccess } from "@/services/notify.service";
import { getApiError } from "@/utils/get-api-error";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Artist } from "@/types/artist/artist.types";

export const addArtistThunk = createAsyncThunk<
    void,
    FormData,
    { rejectValue: string }
>("music-slice/add-artist", async (data, { rejectWithValue }) => {
    try {
        await musicApi.post(`/artists`, data);

        notifySuccess("Artist added successfully");
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const getArtistsThunk = createAsyncThunk<
    Artist[],
    void,
    { rejectValue: string }
>("music-slice/get-artists", async (_, { rejectWithValue }) => {
    try {
        const result = await musicApi.get("/artists");

        return result.data;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const getArtistByIdThunk = createAsyncThunk<
    Artist,
    string,
    { rejectValue: string }
>("music-slice/get-artist-by-id", async (artistId, { rejectWithValue }) => {
    try {
        const result = await musicApi.get(`/artists/${artistId}`);

        return result.data;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const publishArtistThunk = createAsyncThunk<
    Artist,
    string,
    { rejectValue: string }
>("music-slice/publish-artist", async (artistId, { rejectWithValue }) => {
    try {
        const result = await musicApi.post(`/artists/${artistId}/publish`);

        notifySuccess("Artist published successfully");

        return result.data;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const deleteArtistThunk = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("music-slice/delete-artist", async (artistId, { rejectWithValue }) => {
    try {
        await musicApi.delete(`/artists/${artistId}`);

        notifySuccess("Artist deleted successfully");

        return artistId;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});
