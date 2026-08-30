import { musicApi } from "@/api/musicApi";
import { notifyError, notifySuccess } from "@/services/notify.service";
import type { Album, AlbumWithArtist } from "@/types/album/album.types";
import { getApiError } from "@/utils/get-api-error";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addAlbumThunk = createAsyncThunk<
    void,
    FormData,
    { rejectValue: string }
>("album-slice/add-album", async (data, { rejectWithValue }) => {
    try {
        await musicApi.post(`/albums`, data);

        notifySuccess("Album added successfully");
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const getArtistAlbumsThunk = createAsyncThunk<
    Album[],
    string,
    { rejectValue: string }
>("album-slice/get-albums", async (artistId, { rejectWithValue }) => {
    try {
        const result = await musicApi.get("/albums", {
            params: {
                artist: artistId,
            },
        });

        return result.data;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const getAlbumByIdThunk = createAsyncThunk<
    AlbumWithArtist,
    string,
    { rejectValue: string }
>("album-slice/get-album-by-id", async (albumId, { rejectWithValue }) => {
    try {
        const result = await musicApi.get(`/albums/${albumId}`);

        return result.data;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const publishAlbumThunk = createAsyncThunk<
    Album,
    string,
    { rejectValue: string }
>("album-slice/publish-album", async (albumId, { rejectWithValue }) => {
    try {
        const result = await musicApi.post(`/albums/${albumId}/publish`);

        notifySuccess("Album published successfully");

        return result.data;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const deleteAlbumThunk = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("album-slice/delete-album", async (albumId, { rejectWithValue }) => {
    try {
        await musicApi.delete(`/albums/${albumId}`);

        notifySuccess("Album deleted successfully");

        return albumId;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});
