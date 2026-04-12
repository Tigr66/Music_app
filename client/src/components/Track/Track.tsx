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
                <Text className={styles.track_text}>{track.number}</Text>
                <Text className={styles.track_text}>{track.title}</Text>
            </Flex>
            <Text className={styles.track_text}>
                {formatTime(track.duration)}
            </Text>
        </Flex>
    );
};

export default Track;
