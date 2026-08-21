import type { IAuthState } from "@/types/auth/auth-state.types";
import type { AuthUser } from "@/types/auth/auth-types";
import { createSlice } from "@reduxjs/toolkit/react";
import { jwtDecode } from "jwt-decode";
import {
    loginUserThunk,
    logoutUserThunk,
    registerUserThunk,
} from "./authThunks";

const token = localStorage.getItem("access_token");

let user: AuthUser | null = null;

if (token) {
    try {
        user = jwtDecode<AuthUser>(token);
    } catch {
        localStorage.removeItem("access_token");
    }
}

const initialState: IAuthState = {
    user,
    isSending: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUserThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(registerUserThunk.fulfilled, (state) => {
                state.isSending = false;
            })
            .addCase(registerUserThunk.rejected, (state) => {
                state.isSending = false;
            })
            .addCase(loginUserThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.isSending = false;
                state.user = action.payload;
                localStorage.setItem(
                    "access_token",
                    action.payload.accessToken,
                );
            })
            .addCase(loginUserThunk.rejected, (state) => {
                state.isSending = false;
            })
            .addCase(logoutUserThunk.pending, (state) => {
                state.isSending = true;
            })
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.isSending = false;
                localStorage.removeItem("access_token");
                state.user = null;
            })
            .addCase(logoutUserThunk.rejected, (state) => {
                state.isSending = false;
                localStorage.removeItem("access_token");
                state.user = null;
            });
    },
});

export const { clearUser } = authSlice.actions;

export default authSlice.reducer;
