import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import type { Album } from "@/types/album/album.types";
import {
    deleteAlbumThunk,
    publishAlbumThunk,
} from "@/store/albumSlice/albumThunks";
import { appRoutes } from "@/routes/app-routes";

const useAlbumCard = (album: Album) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.auth);

    const { isSending } = useAppSelector((state) => state.album);

    const onClickCard = () => {
        navigate(appRoutes.ALBUMS_TRACKS_PAGE.replace(":id", album.id));
    };

    const handlePublish = () => {
        dispatch(publishAlbumThunk(album.id));
    };

    const handleDelete = () => {
        dispatch(deleteAlbumThunk(album.id));
    };

    return { onClickCard, user, isSending, handlePublish, handleDelete };
};

export default useAlbumCard;
