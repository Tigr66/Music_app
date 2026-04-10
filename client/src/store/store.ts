import { configureStore } from "@reduxjs/toolkit";
import musicSlice from "./musicSlice/musicSlice";
import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
    reducer: {
        music: musicSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
