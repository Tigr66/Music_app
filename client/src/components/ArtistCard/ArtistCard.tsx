import { Button, Card, Flex, Typography } from "antd";
import type { IArtist } from "../../interfaces/IArtist";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
const { Title, Text } = Typography;
import styles from "./ArtistCard.module.css";
import PublishBadge from "../PublishBadge/PublishBadge";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
    deleteArtistThunk,
    publishArtistThunk,
} from "../../store/musicSlice/musicThunks";

interface ArtistCardProps {
    artist: IArtist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.music.user);
    const isSending = useAppSelector((state) => state.music.isSending);

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
                    <Flex vertical gap={10} style={{ padding: 10 }}>
                        {!artist.isPublished && (
                            <Button
                                type="primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(publishArtistThunk(artist.id));
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
                                dispatch(deleteArtistThunk(artist.id));
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

export default ArtistCard;
