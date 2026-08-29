import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import {
    deleteArtistThunk,
    publishArtistThunk,
} from "@/store/artistSlice/artistThunks";
import type { Artist } from "@/types/artist/artist.types";
import { appRoutes } from "@/routes/app-routes";

const useArtistCard = (artist: Artist) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user);
    const isSending = useAppSelector((state) => state.artist.isSending);

    const onClickCard = () => {
        navigate(appRoutes.ARTIST_ALBUMS_PAGE.replace(":id", artist.id));
    };

    const handlePublish = () => {
        dispatch(publishArtistThunk(artist.id));
    };

    const handleDelete = () => {
        dispatch(deleteArtistThunk(artist.id));
    };

    return { onClickCard, user, isSending, handlePublish, handleDelete };
};

export default useArtistCard;
