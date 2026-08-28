import { Typography } from "antd";
import { ArtistCard } from "./components/ArtistCard";
import { Spinner } from "@/components/Spinner";
import { EmptyMessage } from "@/components/EmptyMessage";
import useArtistsPage from "./hooks/useArtistsPage";
import styles from "./styles/ArtistsPage.module.css";

const { Title } = Typography;

const ArtistsPage = () => {
    const { artists, isLoadingArtists } = useArtistsPage();

    return (
        <>
            <Title>All artists:</Title>
            {isLoadingArtists ? (
                <Spinner title="Loading artists" />
            ) : artists.length ? (
                <div className={styles.artists_container}>
                    {artists.map((a) => (
                        <ArtistCard artist={a} key={a.id} />
                    ))}
                </div>
            ) : (
                <EmptyMessage message="There's no any artists at the moment" />
            )}
        </>
    );
};

export default ArtistsPage;
