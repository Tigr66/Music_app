import { Card, Flex, Typography } from "antd";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { useNavigate } from "react-router-dom";
import type { IAlbum } from "../../interfaces/IAlbum";
const { Meta } = Card;
import styles from "./AlbumCard.module.css";
import { formatDate } from "../../utils/formatDate";
const { Title, Text } = Typography;

interface AlbumCardProps {
    album: IAlbum;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
    const navigate = useNavigate();

    return (
        <Card
            hoverable
            className={styles.album_card}
            onClick={() => navigate({ pathname: `/albums/${album.id}/tracks` })}
            cover={
                <img
                    draggable={false}
                    className={styles.album_card_image}
                    alt={album.title}
                    src={resolveImageUrl(album.cover)}
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
                            {formatDate(new Date(album.publishedAt))}
                        </Text>
                        <Text>Tracks: {album.count}</Text>
                    </Flex>
                }
            />
        </Card>
    );
};

export default AlbumCard;
