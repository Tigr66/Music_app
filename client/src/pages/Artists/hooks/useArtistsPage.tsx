import { getArtistsThunk } from "@/store/artistSlice/artistThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const useArtistsPage = () => {
    const dispatch = useAppDispatch();

    const { artists, isLoading: isLoadingArtists } = useAppSelector(
        (state) => state.artist,
    );

    useEffect(() => {
        dispatch(getArtistsThunk());
    }, [dispatch]);

    return {
        artists,
        isLoadingArtists,
    };
};

export default useArtistsPage;
