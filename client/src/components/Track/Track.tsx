import { Button, Flex, Typography } from "antd";
import type { ITrack } from "../../interfaces/ITrack";
import { formatTime } from "../../utils/formatTime";
const { Text } = Typography;
import styles from "./Track.module.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { CaretRightOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../routes/appRoutes";

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

        // dispatch()
    };

    return (
        <Flex className={styles.track} justify="space-between" align="center">
            <Flex gap="medium">
                <Text strong>{track.number}</Text>
                <Text strong>{track.title}</Text>
            </Flex>
            <Flex gap={20} align="center">
                <CaretRightOutlined
                    onClick={handlePlay}
                    className={styles.play_button}
                    disabled={isSending}
                />
                <Text strong>{formatTime(track.duration)}</Text>
            </Flex>
        </Flex>
    );
};

export default Track;
