import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArtist } from "../../interfaces/IArtist";
import type { AxiosError } from "axios";
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
