import { musicApi } from "@/api/musicApi";
import { notifyError, notifySuccess } from "@/services/notify.service";
import { getApiError } from "@/utils/get-api-error";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Track } from "@/types/track/track.types";
import type { CreateTrackType } from "@/types/track/track-form.types";

export const addTrackThunk = createAsyncThunk<
    void,
    CreateTrackType,
    { rejectValue: string }
>("track-slice/add-track", async (data, { rejectWithValue }) => {
    try {
        await musicApi.post(`/tracks`, data);

        notifySuccess("Track added successfully!");
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const getAlbumTracksThunk = createAsyncThunk<
    Track[],
    string,
    { rejectValue: string }
>("track-slice/get-tracks", async (albumId, { rejectWithValue }) => {
    try {
        const result = await musicApi.get("/tracks", {
            params: {
                album: albumId,
            },
        });

        return result.data;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const publishTrackThunk = createAsyncThunk<
    Track,
    string,
    { rejectValue: string }
>("track-slice/publish-track", async (trackId, { rejectWithValue }) => {
    try {
        const result = await musicApi.post(`/tracks/${trackId}/publish`);

        notifySuccess("Track published successfully!");

        return result.data;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const deleteTrackThunk = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("track-slice/delete-track", async (trackId, { rejectWithValue }) => {
    try {
        await musicApi.delete(`/tracks/${trackId}`);

        notifySuccess("Track deleted successfully!");

        return trackId;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});
