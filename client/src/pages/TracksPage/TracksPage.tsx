import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import {
    getAlbumById,
    getAlbumTracksThunk,
} from "../../store/musicSlice/musicThunks";
import { Flex, Typography } from "antd";
import EmptyMessage from "../../components/EmptyMessage/EmptyMessage";
import Spinner from "../../components/Spinner/Spinner";
import Track from "../../components/Track/Track";
import AlbumPreview from "../../components/AlbumPreview/AlbumPreview";
import AlbumPreviewSkeleton from "../../components/AlbumPreview/AlbumPreviewSkeleton";
import {
    setCurrentAlbum,
    setCurrentTrack,
} from "../../store/musicSlice/musicSlice";
import YoutubeModal from "../../components/YoutubeModal/YoutubeModal";
const { Text } = Typography;

const TracksPage = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();

    const tracks = useAppSelector((state) => state.music.albumTracks);
    const isLoadingTracks = useAppSelector(
        (state) => state.music.isLoadingTracks,
    );
    const isLoadingAlbum = useAppSelector(
        (state) => state.music.isLoadingAlbum,
    );

    useEffect(() => {
        if (id && !isNaN(Number(id))) {
            dispatch(getAlbumTracksThunk(Number(id)));
            dispatch(getAlbumById(Number(id)));
        }
        return () => {
            dispatch(setCurrentAlbum(null));
            dispatch(setCurrentTrack(null));
        };
    }, [id, dispatch]);

    return (
        <>
            <Flex vertical gap={20}>
                {isLoadingAlbum ? <AlbumPreviewSkeleton /> : <AlbumPreview />}
                {isLoadingTracks ? (
                    <Spinner title="Loading tracks" />
                ) : tracks.length ? (
                    <Flex vertical gap="small">
                        <Flex justify="space-between">
                            <Flex gap="medium">
                                <Text strong>№</Text>
                                <Text strong>TRACK TITLE</Text>
                            </Flex>
                            <Text strong>DURATION</Text>
                        </Flex>
                        {tracks.map((t) => (
                            <Track track={t} key={t.id} />
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
