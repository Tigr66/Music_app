import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { setCurrentAlbum } from "../../store/musicSlice/musicSlice";
import { getAlbumTracksThunk } from "../../store/musicSlice/musicThunks";
import { Flex, Typography } from "antd";
import EmptyMessage from "../../components/EmptyMessage/EmptyMessage";
import Spinner from "../../components/Spinner/Spinner";
import Track from "../../components/Track/Track";
import AlbumPreview from "../../components/AlbumPreview/AlbumPreview";
const { Text } = Typography;

const TracksPage = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();

    const tracks = useAppSelector((state) => state.music.albumTracks);
    const isLoading = useAppSelector((state) => state.music.isLoading);

    useEffect(() => {
        if (id && !isNaN(Number(id))) {
            dispatch(getAlbumTracksThunk(Number(id)));
            dispatch(setCurrentAlbum(Number(id)));
        }
    }, [id, dispatch]);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : tracks.length ? (
                <Flex vertical gap={20}>
                    <AlbumPreview />
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
                </Flex>
            ) : (
                <EmptyMessage message="This album doesn't have any tracks" />
            )}
        </>
    );
};

export default TracksPage;
