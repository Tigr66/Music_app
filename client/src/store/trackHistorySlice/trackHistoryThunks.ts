import { musicApi } from "@/api/musicApi";
import { notifyError, notifyInfo } from "@/services/notify.service";
import { getApiError } from "@/utils/get-api-error";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TrackHistory } from "@/types/track-history/track-history.types";

export const addHistoryThunk = createAsyncThunk<
    void,
    string,
    { rejectValue: string }
>("music-slice/add-history", async (trackId, { rejectWithValue }) => {
    try {
        await musicApi.post("/track-histories", { trackId });

        notifyInfo("Added to history!");
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const getHistoryThunk = createAsyncThunk<
    TrackHistory[],
    void,
    { rejectValue: string }
>("music-slice/get-history", async (_, { rejectWithValue }) => {
    try {
        const result = await musicApi.get("/track-histories");

        return result.data;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});
