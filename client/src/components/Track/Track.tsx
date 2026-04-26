import { Badge, Button, Flex, Typography } from "antd";
import type { ITrack } from "../../interfaces/ITrack";
import { formatTime } from "../../utils/formatTime";
const { Text } = Typography;
import styles from "./Track.module.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { CaretRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../routes/appRoutes";
import {
    addHistoryThunk,
    deleteTrackThunk,
    publishTrackThunk,
} from "../../store/musicSlice/musicThunks";
import { setCurrentTrack } from "../../store/musicSlice/musicSlice";

interface TrackProps {
    track: ITrack;
}

const Track = ({ track }: TrackProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.music.user);
    const isSending = useAppSelector((state) => state.music.isSending);

    const handlePlay = () => {
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

    return (
        <Flex
            className={styles.track}
            justify="space-between"
            align="center"
            onClick={() => {
                if (!isSending && (user?.role === "USER" || !user))
                    handlePlay();
            }}
        >
            <Flex gap="medium">
                <Text strong>{track.number}</Text>
                {track.isPublished ? (
                    <Text strong>{track.title}</Text>
                ) : (
                    <Badge
                        count={
                            <ClockCircleOutlined style={{ color: "#f5222d" }} />
                        }
                    >
                        <Text strong>{track.title}</Text>
                    </Badge>
                )}
            </Flex>
            {user?.role === "ADMIN" && (
                <Flex gap={10}>
                    {!track.isPublished && (
                        <Button
                            type="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(publishTrackThunk(track.id));
                            }}
                            loading={isSending}
                        >
                            Publish
                        </Button>
                    )}
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deleteTrackThunk(track.id));
                        }}
                        type="primary"
                        loading={isSending}
                        danger
                    >
                        Delete
                    </Button>
                </Flex>
            )}
            <Flex gap={20} align="center">
                <CaretRightOutlined
                    onClick={() => {
                        if (!isSending && user?.role === "ADMIN") handlePlay();
                    }}
                    className={styles.play_button}
                />
                <Text strong>{formatTime(track.duration)}</Text>
            </Flex>
        </Flex>
    );
};

export default Track;
