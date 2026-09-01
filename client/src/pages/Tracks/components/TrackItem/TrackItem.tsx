import { Badge, Flex, Typography } from "antd";
import { CaretRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { formatTime } from "@/utils/format-time";
import { AdminCardActions } from "@/components/AdminCardActions";
import type { Track } from "@/types/track/track.types";
import useTrack from "@/pages/Tracks/hooks/useTrack";
import styles from "./TrackItem.module.css";

const { Text } = Typography;

interface TrackItemProps {
    track: Track;
}

const TrackItem = ({ track }: TrackItemProps) => {
    const {
        handlePlay,
        user,
        handlePublishTrack,
        handleDeleteTrack,
        isSending,
    } = useTrack(track);

    return (
        <Flex
            className={styles.track}
            justify="space-between"
            align="center"
            onClick={handlePlay}
        >
            <Flex gap={16}>
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
                <AdminCardActions
                    isSending={isSending}
                    isPublished={track.isPublished}
                    onPublish={handlePublishTrack}
                    onDelete={handleDeleteTrack}
                />
            )}
            <Flex gap={20} align="center">
                <CaretRightOutlined
                    onClick={handlePlay}
                    className={styles.play_button}
                />
                <Text strong>{formatTime(track.duration)}</Text>
            </Flex>
        </Flex>
    );
};

export default TrackItem;
