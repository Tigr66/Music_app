import { Button, Card, Flex, Typography } from "antd";
import { resolveImageUrl } from "../../utils/resolve-Image-url";
import { useNavigate } from "react-router-dom";
import type { IAlbum } from "../../interfaces/IAlbum";
const { Meta } = Card;
import styles from "./AlbumCard.module.css";
import { formatDate } from "../../utils/format-date";
import PublishBadge from "../PublishBadge/PublishBadge";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
    deleteAlbumThunk,
    publishAlbumThunk,
} from "../../store/musicSlice/musicThunks";
const { Title, Text } = Typography;

interface AlbumCardProps {
    album: IAlbum;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.music.user);
    const isSending = useAppSelector((state) => state.music.isSending);

    return (
        <PublishBadge isPublished={album.isPublished}>
            <Card
                hoverable
                className={styles.album_card}
                onClick={() =>
                    navigate({ pathname: `/albums/${album.id}/tracks` })
                }
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
                                {formatDate(new Date(album.publishedAt), false)}
                            </Text>
                            <Text>Tracks: {album.count}</Text>
                        </Flex>
                    }
                />
                {user?.role === "ADMIN" && (
                    <Flex vertical gap={10} style={{ padding: 10 }}>
                        {!album.isPublished && (
                            <Button
                                type="primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(publishAlbumThunk(album.id));
                                }}
                                style={{ width: "100%" }}
                                loading={isSending}
                            >
                                Publish
                            </Button>
                        )}
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(deleteAlbumThunk(album.id));
                            }}
                            type="primary"
                            style={{ width: "100%" }}
                            loading={isSending}
                            danger
                        >
                            Delete
                        </Button>
                    </Flex>
                )}
            </Card>
        </PublishBadge>
    );
};

export default AlbumCard;
