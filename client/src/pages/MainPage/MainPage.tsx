import { Flex, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { getArtistsThunk } from "../../store/musicSlice/musicThunks";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import EmptyMessage from "../../components/EmptyMessage/EmptyMessage";
import Spinner from "../../components/Spinner/Spinner";
import { clearCurrents } from "../../store/musicSlice/musicSlice";
const { Title } = Typography;

const MainPage = () => {
    const dispatch = useAppDispatch();

    const artists = useAppSelector((state) => state.music.artists);
    const isLoading = useAppSelector((state) => state.music.isLoading);

    useEffect(() => {
        dispatch(getArtistsThunk());
        dispatch(clearCurrents());
    }, []);

    return (
        <>
            <Title style={{ color: "#dcdadb" }}>All artists:</Title>
            {isLoading ? (
                <Spinner />
            ) : artists.length ? (
                <Flex wrap gap="small">
                    {artists.map((a) => (
                        <ArtistCard artist={a} key={a.id} />
                    ))}
                </Flex>
            ) : (
                <EmptyMessage message="There's no any artists at the moment" />
            )}
        </>
    );
};

export default MainPage;
