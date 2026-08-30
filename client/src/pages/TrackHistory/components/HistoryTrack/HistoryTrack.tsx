import { Flex, Typography } from "antd";
import { formatDate } from "@/utils/format-date";
import type { TrackHistory } from "@/types/track-history/track-history.types";
import styles from "./HistoryTrack.module.css";

const { Title } = Typography;

interface HistoryTrackProps {
    track: TrackHistory;
}

const HistoryTrack = ({ track }: HistoryTrackProps) => {
    return (
        <Flex className={styles.history_track} justify="space-between">
            <Title level={3} style={{ margin: 0 }}>
                {track.artistName} - {track.trackTitle}
            </Title>
            
            <Title level={3} style={{ margin: 0 }}>
                at {formatDate(new Date(track.datetime), true)}
            </Title>
        </Flex>
    );
};

export default HistoryTrack;
