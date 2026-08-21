import { configureStore } from "@reduxjs/toolkit";
import musicSlice from "./musicSlice/musicSlice";
import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
} from "react-redux";
import authSlice from "./authSlice/authSlice";

export const store = configureStore({
    reducer: {
        music: musicSlice,
        auth: authSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
