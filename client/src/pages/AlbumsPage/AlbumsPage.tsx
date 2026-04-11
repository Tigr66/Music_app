import { Flex, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArtistAlbumsThunk } from "../../store/musicSlice/musicThunks";
import { setCurrentArtist } from "../../store/musicSlice/musicSlice";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import EmptyMessage from "../../components/EmptyMessage/EmptyMessage";
import Spinner from "../../components/Spinner/Spinner";
const { Title } = Typography;

const AlbumsPage = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();

    const albums = useAppSelector((state) => state.music.artistAlbums);
    const currentArtist = useAppSelector((state) => state.music.currentArtist);
    const isLoading = useAppSelector((state) => state.music.isLoading);

    useEffect(() => {
        if (id && !isNaN(Number(id))) {
            dispatch(getArtistAlbumsThunk(Number(id)));
            dispatch(setCurrentArtist(Number(id)));
        }
    }, []);

    return (
        <>
            <Title style={{ color: "#dcdadb" }}>
                All albums {currentArtist && `by ${currentArtist}`}:
            </Title>
            {isLoading ? (
                <Spinner />
            ) : albums.length ? (
                <Flex wrap gap="small">
                    {albums.map((a) => (
                        <AlbumCard album={a} key={a.id} />
                    ))}
                </Flex>
            ) : (
                <EmptyMessage message="This artist doesn't have any albums" />
            )}
        </>
    );
};

export default AlbumsPage;
