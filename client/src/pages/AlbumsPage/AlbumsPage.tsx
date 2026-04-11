import { Flex } from "antd";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";

const AlbumsPage = () => {
    const dispatch = useAppDispatch();

    const artists = useAppSelector((state) => state.music.artists);

    useEffect(() => {
        // dispatch(getArtistsThunk());
    }, []);

    return (
        <Flex wrap gap="small">
            {artists.map((a) => {
                return <ArtistCard artist={a} key={a.id} />;
            })}
        </Flex>
    );
};

export default AlbumsPage;
