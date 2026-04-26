import { Flex, Skeleton, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    getArtistAlbumsThunk,
    getArtistThunk,
} from "../../store/musicSlice/musicThunks";
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
    const isLoadingAlbums = useAppSelector(
        (state) => state.music.isLoadingAlbums,
    );
    const isLoadingArtist = useAppSelector(
        (state) => state.music.isLoadingArtist,
    );

    useEffect(() => {
        if (id && !isNaN(Number(id))) {
            dispatch(getArtistThunk(Number(id)));
            dispatch(getArtistAlbumsThunk(Number(id)));
        }

        return () => {
            dispatch(setCurrentArtist(null));
        };
    }, [id, dispatch]);

    return (
        <>
            {isLoadingArtist ? (
                <Skeleton
                    active
                    title={{
                        width: 400,
                    }}
                    paragraph={false}
                    style={{ height: 46 }}
                />
            ) : (
                <Title>
                    All albums {currentArtist && `by ${currentArtist.name}`}:
                </Title>
            )}

            {isLoadingAlbums && !albums.length ? (
                <Spinner title="Loading albums" />
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
