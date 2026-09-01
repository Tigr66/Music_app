import { useParams } from "react-router-dom";
import { Flex, Typography } from "antd";
import { Spinner } from "@/components/Spinner";
import { AlbumPreview, AlbumPreviewSkeleton } from "./components/AlbumPreview";
import { TrackItem } from "./components/TrackItem";
import { EmptyMessage } from "@/components/EmptyMessage";
import { YoutubeModal } from "./components/YoutubeModal";
import useTracksPage from "./hooks/useTracksPage";

const { Text } = Typography;

const TracksPage = () => {
    const { id } = useParams();

    const { isLoadingAlbum, isLoadingTracks, tracks } = useTracksPage(id);

    return (
        <>
            <Flex vertical gap={20}>
                {isLoadingAlbum ? <AlbumPreviewSkeleton /> : <AlbumPreview />}

                {isLoadingTracks ? (
                    <Spinner title="Loading tracks" />
                ) : tracks.length ? (
                    <Flex vertical gap={8}>

                        <Flex justify="space-between">
                            <Flex gap={16}>
                                <Text strong>№</Text>
                                <Text strong>TRACK TITLE</Text>
                            </Flex>
                            <Text strong>DURATION</Text>
                        </Flex>

                        {tracks.map((t) => (
                            <TrackItem track={t} key={t.id} />
                        ))}
                    </Flex>
                ) : (
                    <EmptyMessage message="This album doesn't have any tracks" />
                )}
            </Flex>

            <YoutubeModal />
        </>
    );
};

export default TracksPage;
