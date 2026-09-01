import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentTrack } from "@/store/trackSlice/trackSlice";

const useYoutubeModal = () => {
    const dispatch = useAppDispatch();
    const track = useAppSelector((state) => state.track.currentTrack);

    const onCancel = () => {
        dispatch(setCurrentTrack(null));
    };

    return { track, onCancel };
};

export default useYoutubeModal;
