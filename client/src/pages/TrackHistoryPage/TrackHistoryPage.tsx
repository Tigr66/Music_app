import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { appRoutes } from "../../routes/appRoutes";
import { toast } from "react-toastify";
import { getHistoryThunk } from "../../store/musicSlice/musicThunks";
import { Flex } from "antd";
import Spinner from "../../components/Spinner/Spinner";
import HistoryTrack from "../../components/HistoryTrack/HistoryTrack";

const TrackHistoryPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.music.user);
    const history = useAppSelector((state) => state.music.history);
    const isLoadingHistory = useAppSelector(
        (state) => state.music.isLoadingHistory,
    );

    useEffect(() => {
        if (!user) {
            toast.info("Please log in to watch your history");
            navigate({
                pathname: appRoutes.LOGIN_PAGE,
            });
            return;
        }
        dispatch(getHistoryThunk());
    }, []);

    return isLoadingHistory ? (
        <Spinner title="Loading history" />
    ) : (
        <Flex
            vertical
            gap={10}
            align="center"
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderRadius: 16,
                padding: 16,
            }}
        >
            {history.map((t) => {
                return <HistoryTrack track={t} key={t.id} />;
            })}
        </Flex>
    );
};

export default TrackHistoryPage;
