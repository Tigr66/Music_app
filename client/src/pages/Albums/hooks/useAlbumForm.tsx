import { appRoutes } from "@/routes/app-routes";
import { addAlbumThunk } from "@/store/albumSlice/albumThunks";
import { getArtistsThunk } from "@/store/artistSlice/artistThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { AlbumFormType } from "@/types/album/album-form.types";
import { extractFile } from "@/utils/extract-file";
import { Form } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAlbumForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const { isSending } = useAppSelector((state) => state.album);

    const { artists, isLoading: isLoadingArtists } = useAppSelector(
        (state) => state.artist,
    );

    const handleAdd = async (data: AlbumFormType) => {
        const formData = new FormData();

        const { title, artistId, cover } = data;

        formData.append("title", title);
        formData.append("artistId", String(artistId));

        const file = extractFile(cover);

        if (file) {
            formData.append("cover", file);
        }

        form.resetFields();

        await dispatch(addAlbumThunk(formData)).unwrap();

        navigate(appRoutes.ARTIST_ALBUMS_PAGE.replace(":id", artistId));
    };

    useEffect(() => {
        dispatch(getArtistsThunk());
    }, [dispatch]);

    return { form, handleAdd, isLoadingArtists, artists, isSending };
};

export default useAlbumForm;
