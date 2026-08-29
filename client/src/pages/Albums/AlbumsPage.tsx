import { EmptyMessage } from "@/components/EmptyMessage";
import { Spinner } from "@/components/Spinner";
import { Typography } from "antd";
import { AlbumCard } from "./components/AlbumCard";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import useAlbumsPage from "./hooks/useAlbumsPage";
import styles from "./styles/AlbumsPage.module.css";

const { Title } = Typography;

const AlbumsPage = () => {
    const { id } = useParams();

    const { albums, isLoadingAlbums, artist, isLoadingArtist } =
        useAlbumsPage(id);

    return (
        <>
            <Title>
                All albums{" "}
                {isLoadingArtist ? (
                    <LoadingOutlined />
                ) : (
                    artist && `by ${artist.name}:`
                )}
            </Title>

            {isLoadingAlbums && !albums.length ? (
                <Spinner title="Loading albums" />
            ) : albums.length ? (
                <div className={styles.albums_container}>
                    {albums.map((a) => (
                        <AlbumCard album={a} key={a.id} />
                    ))}
                </div>
            ) : (
                <EmptyMessage message="This artist doesn't have any albums" />
            )}
        </>
    );
};

export default AlbumsPage;
