import { setCurrentAlbum } from "@/store/albumSlice/albumSlice";
import { getAlbumByIdThunk } from "@/store/albumSlice/albumThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentTrack } from "@/store/trackSlice/trackSlice";
import { getAlbumTracksThunk } from "@/store/trackSlice/trackThunks";
import { useEffect } from "react";

const useTracksPage = (id?: string) => {
    const dispatch = useAppDispatch();

    const { tracks, isLoading: isLoadingTracks } = useAppSelector(
        (state) => state.track,
    );

    const { isLoading: isLoadingAlbum } = useAppSelector(
        (state) => state.album,
    );

    useEffect(() => {
        if (id) {
            dispatch(getAlbumTracksThunk(id));
            dispatch(getAlbumByIdThunk(id));
        }
        return () => {
            dispatch(setCurrentAlbum(null));
            dispatch(setCurrentTrack(null));
        };
    }, [id, dispatch]);

    return { isLoadingAlbum, isLoadingTracks, tracks };
};

export default useTracksPage;
