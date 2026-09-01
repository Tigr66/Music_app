import { getArtistsThunk } from "@/store/artistSlice/artistThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addTrackThunk } from "@/store/trackSlice/trackThunks";
import { Form } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getArtistAlbumsThunk } from "@/store/albumSlice/albumThunks";
import { appRoutes } from "@/routes/app-routes";
import type { TrackFormType } from "@/types/track/track-form.types";

const useTrackForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const artistId = Form.useWatch("artistId", form);

    const { artistAlbums, isLoading: isLoadingAlbums } = useAppSelector(
        (state) => state.album,
    );

    const { artists, isLoading: isLoadingArtists } = useAppSelector(
        (state) => state.artist,
    );

    const { isSending } = useAppSelector((state) => state.track);

    const handleAdd = async (data: TrackFormType) => {
        const { albumId, title, duration, youtubeUrl } = data;

        const newTrack = {
            title: title.trim(),
            duration,
            youtubeUrl,
            albumId,
        };

        await dispatch(addTrackThunk(newTrack)).unwrap();

        navigate(appRoutes.ALBUMS_TRACKS_PAGE.replace(":id", albumId));
    };

    const onChangeArtist = (artistId: string) => {
        dispatch(getArtistAlbumsThunk(artistId));
        form.setFieldsValue({ albumId: undefined });
    };

    useEffect(() => {
        dispatch(getArtistsThunk());
    }, [dispatch]);

    return {
        form,
        artistId,
        handleAdd,
        isLoadingArtists,
        artists,
        isLoadingAlbums,
        artistAlbums,
        onChangeArtist,
        isSending,
    };
};

export default useTrackForm;
