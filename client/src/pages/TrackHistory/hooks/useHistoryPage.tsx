import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getHistoryThunk } from "@/store/trackHistorySlice/trackHistoryThunks";
import { useEffect } from "react";

const useHistoryPage = () => {
    const dispatch = useAppDispatch();

    const { isLoading, trackHistory } = useAppSelector(
        (state) => state.trackHistory,
    );

    useEffect(() => {
        dispatch(getHistoryThunk());
    }, []);

    return { isLoading, trackHistory };
};

export default useHistoryPage;
