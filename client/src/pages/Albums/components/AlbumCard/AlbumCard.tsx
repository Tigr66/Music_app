import { PublishBadge } from "@/components/PublishBadge";
import { Card, Flex, Typography } from "antd";
import { AdminCardActions } from "@/components/AdminCardActions";
import { formatDate } from "@/utils/format-date";
import type { Album } from "@/types/album/album.types";
import useAlbumCard from "@/pages/Albums/hooks/useAlbumCard";
import styles from "./AlbumCard.module.css";

const { Meta } = Card;
const { Title, Text } = Typography;

interface AlbumCardProps {
    album: Album;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
    const { onClickCard, user, isSending, handleDelete, handlePublish } =
        useAlbumCard(album);

    return (
        <PublishBadge isPublished={album.isPublished}>
            <Card
                hoverable
                className={styles.album_card}
                onClick={onClickCard}
                cover={
                    <img
                        draggable={false}
                        className={styles.album_card_image}
                        alt={album.title}
                        src={album.cover}
                    />
                }
            >
                <Meta
                    title={
                        <Title level={1} style={{ margin: 0 }}>
                            {album.title}
                        </Title>
                    }
                    description={
                        <Flex vertical>
                            <Text>
                                Realased at:{" "}
                                {formatDate(new Date(album.publishedAt), false)}
                            </Text>
                            <Text>Tracks: {album.count}</Text>
                        </Flex>
                    }
                />
                {user?.role === "ADMIN" && (
                    <AdminCardActions
                        onPublish={handlePublish}
                        onDelete={handleDelete}
                        isPublished={album.isPublished}
                        isSending={isSending}
                    />
                )}
            </Card>
        </PublishBadge>
    );
};

export default AlbumCard;
