import { Card, Typography } from "antd";
import { PublishBadge } from "@/components/PublishBadge";
import { resolveImageUrl } from "@/utils/resolve-Image-url";
import { AdminCardActions } from "@/components/AdminCardActions";
import type { Artist } from "@/types/artist/artist.types";
import useArtistCard from "@/pages/Artists/hooks/useArtistCard";
import styles from "./ArtistCard.module.css";

const { Meta } = Card;
const { Title, Text } = Typography;

interface ArtistCardProps {
    artist: Artist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
    const { user, isSending, navigate, handlePublish, handleDelete } =
        useArtistCard(artist);

    return (
        <PublishBadge isPublished={artist.isPublished}>
            <Card
                hoverable
                className={styles.artist_card}
                onClick={() => {
                    navigate({ pathname: `/artists/${artist.id}/albums` });
                }}
                cover={
                    <img
                        draggable={false}
                        className={styles.artist_card_image}
                        alt={artist.name}
                        src={resolveImageUrl(artist.photo)}
                    />
                }
            >
                <Meta
                    title={
                        <Title level={2} style={{ margin: 0 }}>
                            {artist.name}
                        </Title>
                    }
                    description={<Text>{artist.info}</Text>}
                />
                
                {user?.role === "ADMIN" && (
                    <AdminCardActions
                        onPublish={handlePublish}
                        onDelete={handleDelete}
                        isPublished={artist.isPublished}
                        isSending={isSending}
                    />
                )}
            </Card>
        </PublishBadge>
    );
};

export default ArtistCard;
