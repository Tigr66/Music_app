import { Flex, Typography } from "antd";
import { ArtistCard } from "./components/ArtistCard";
import { Spinner } from "@/components/Spinner";
import { EmptyMessage } from "@/components/EmptyMessage";
import useArtistsPage from "./hooks/useArtistsPage";

const { Title } = Typography;

const ArtistsPage = () => {
    const { artists, isLoadingArtists } = useArtistsPage();

    return (
        <>
            <Title>All artists:</Title>
            {isLoadingArtists ? (
                <Spinner title="Loading artists" />
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

export default ArtistsPage;
