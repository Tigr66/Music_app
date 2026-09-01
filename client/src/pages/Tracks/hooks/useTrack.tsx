import { appRoutes } from "@/routes/app-routes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addHistoryThunk } from "@/store/trackHistorySlice/trackHistoryThunks";
import { setCurrentTrack } from "@/store/trackSlice/trackSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    deleteTrackThunk,
    publishTrackThunk,
} from "@/store/trackSlice/trackThunks";
import type { Track } from "@/types/track/track.types";

const useTrack = (track: Track) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.auth.user);

    const { isSending } = useAppSelector((state) => state.track);

    const handlePlay = () => {
        if (isSending) {
            toast.info("Please wait, the track is being processed");
            return;
        }

        if (!user) {
            toast.info("To listen to the track, please log in");
            navigate({ pathname: appRoutes.LOGIN_PAGE });
            return;
        }

        dispatch(setCurrentTrack(track));

        if (!track.isPublished) {
            toast.info(
                "This track is not published, so it won't be added to history",
            );
            return;
        }

        dispatch(addHistoryThunk(track.id));
    };

    const handlePublishTrack = () => {
        dispatch(publishTrackThunk(track.id));
    };

    const handleDeleteTrack = () => {
        dispatch(deleteTrackThunk(track.id));
    };

    return { handlePlay, user, handlePublishTrack, handleDeleteTrack, isSending };
};

export default useTrack;
