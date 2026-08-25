import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSlice";
import artistSlice from "./artistSlice/artistSlice";
import albumSlice from "./albumSlice/albumSlice";
import trackHistorySlice from "./trackHistorySlice/trackHistorySlice";
import trackSlice from "./trackSlice/trackSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        artist: artistSlice,
        album: albumSlice,
        track: trackSlice,
        trackHistory: trackHistorySlice,
    },
});

