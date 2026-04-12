import { Flex, Typography } from "antd";
import type { ITrack } from "../../interfaces/ITrack";
import { formatTime } from "../../utils/formatTime";
const { Text } = Typography;
import styles from "./Track.module.css";

interface TrackProps {
    track: ITrack;
}

const Track = ({ track }: TrackProps) => {
    return (
        <Flex className={styles.track} justify="space-between">
            <Flex gap="medium">
                <Text strong>{track.number}</Text>
                <Text strong>{track.title}</Text>
            </Flex>
            <Text strong>{formatTime(track.duration)}</Text>
        </Flex>
    );
};

export default Track;
