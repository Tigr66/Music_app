import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import artistSlice from "./artistSlice";
import albumSlice from "./albumSlice";
import trackHistorySlice from "./trackHistorySlice";
import trackSlice from "./trackSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        artist: artistSlice,
        album: albumSlice,
        track: trackSlice,
        trackHistory: trackHistorySlice,
    },
});
