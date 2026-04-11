import { Flex } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import { useParams } from "react-router-dom";
import { getArtistAlbumsThunk } from "../../store/musicSlice/musicThunks";

const AlbumsPage = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();

    const albums = useAppSelector((state) => state.music.artistAlbums);

    useEffect(() => {
        dispatch(getArtistAlbumsThunk(Number(id)));
    }, []);

    return (
        <Flex wrap gap="small">
            {albums.map((a) => {
                return <AlbumCard album={a} key={a.id} />;
            })}
        </Flex>
    );
};

export default AlbumsPage;
