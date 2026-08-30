import { Flex } from "antd";
import { Spinner } from "@/components/Spinner";
import { HistoryTrack } from "./components/HistoryTrack";
import { EmptyMessage } from "@/components/EmptyMessage";
import { PlayCircleOutlined } from "@ant-design/icons";
import styles from "./styles/TrackHistoryPage.module.css";
import useHistoryPage from "./hooks/useHistoryPage";

const TrackHistoryPage = () => {
    const { isLoading, trackHistory } = useHistoryPage();

    return isLoading ? (
        <Spinner title="Loading history" />
    ) : trackHistory.length ? (
        <Flex
            vertical
            gap={10}
            align="center"
            className={styles.history_container}
        >
            {trackHistory.map((t) => {
                return <HistoryTrack track={t} key={t.id} />;
            })}
        </Flex>
    ) : (
        <EmptyMessage
            icon={<PlayCircleOutlined />}
            message="Listen to at least one track to see your history"
        />
    );
};

export default TrackHistoryPage;
