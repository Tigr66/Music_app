import { Flex } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { getArtistsThunk } from "../../store/musicSlice/musicThunks";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

const MainPage = () => {
    const dispatch = useAppDispatch();

    const artists = useAppSelector((state) => state.music.artists);

    useEffect(() => {
        dispatch(getArtistsThunk());
    }, []);

    return (
        <Flex wrap gap="small" style={{ padding: 20 }}>
            {artists.map((a) => {
                return <ArtistCard artist={a} key={a.id} />;
            })}
        </Flex>
    );
};

export default MainPage;
