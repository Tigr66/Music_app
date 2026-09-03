import type { AuthResponse } from "@/types/auth/auth.types";
import type { AuthFormType } from "@/types/auth/auth-form.types";
import { musicApi } from "@/api/musicApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApiError } from "@/utils/get-api-error";
import { notifyError, notifySuccess } from "@/services/notify.service";

export const registerUserThunk = createAsyncThunk<
    void,
    AuthFormType,
    { rejectValue: string }
>("auth-slice/register-user", async (newUser, { rejectWithValue }) => {
    try {
        await musicApi.post("/auth/register", newUser);

        notifySuccess("Registration successful. Please log in.");
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const loginUserThunk = createAsyncThunk<
    AuthResponse,
    AuthFormType,
    { rejectValue: string }
>("auth-slice/login-user", async (loginData, { rejectWithValue }) => {
    try {
        const result = await musicApi.post("/auth/login", loginData);

        notifySuccess("Welcome back!");

        return result.data;
    } catch (err) {
        const error = getApiError(err);
        notifyError(error);
        return rejectWithValue(error);
    }
});

export const logoutUserThunk = createAsyncThunk<void, boolean | undefined>(
    "auth/logout-user",
    async (notify = true) => {
        await musicApi.post<{ message: string }>("/auth/logout");

        if (notify) {
            notifySuccess("Logged out successfully");
        }
    },
);
