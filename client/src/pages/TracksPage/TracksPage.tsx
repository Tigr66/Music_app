import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { setCurrentAlbum } from "../../store/musicSlice/musicSlice";
import { getAlbumTracksThunk } from "../../store/musicSlice/musicThunks";
import { Flex, Typography } from "antd";
import EmptyMessage from "../../components/EmptyMessage/EmptyMessage";
import Spinner from "../../components/Spinner/Spinner";
import Track from "../../components/Track/Track";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
const { Text } = Typography;

const TracksPage = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();

    const tracks = useAppSelector((state) => state.music.albumTracks);
    const currentAlbum = useAppSelector((state) => state.music.currentAlbum);
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
                <Flex vertical gap="small">
                    <Flex justify="space-between">
                        <Flex gap="medium">
                            <Text style={{ color: "#dcdadb" }}>№</Text>
                            <Text style={{ color: "#dcdadb" }}>
                                TRACK TITLE
                            </Text>
                        </Flex>
                        <Text style={{ color: "#dcdadb" }}>DURATION</Text>
                    </Flex>
                    {tracks.map((t) => (
                        <Track track={t} key={t.id} />
                    ))}
                </Flex>
            ) : (
                <EmptyMessage message="This album doesn't have any tracks" />
            )}
        </>
    );
};

export default TracksPage;
