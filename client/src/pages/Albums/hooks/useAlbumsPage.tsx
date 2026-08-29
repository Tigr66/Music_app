import { getArtistAlbumsThunk } from "@/store/albumSlice/albumThunks";
import { setCurrentArtist } from "@/store/artistSlice/artistSlice";
import { getArtistByIdThunk } from "@/store/artistSlice/artistThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const useAlbumsPage = (id?: string) => {
    const dispatch = useAppDispatch();

    const { isLoading: isLoadingAlbums, artistAlbums: albums } = useAppSelector(
        (state) => state.album,
    );

    const { isLoading: isLoadingArtist, currentArtist: artist } = useAppSelector(
        (state) => state.artist,
    );

    useEffect(() => {
        if (id) {
            dispatch(getArtistByIdThunk(id));
            dispatch(getArtistAlbumsThunk(id));
        }

        return () => {
            dispatch(setCurrentArtist(null));
        };
    }, [id, dispatch]);

    return { isLoadingAlbums, albums, isLoadingArtist, artist };
};

export default useAlbumsPage;
