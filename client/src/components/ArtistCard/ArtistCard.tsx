import { Card, Typography } from "antd";
import type { IArtist } from "../../interfaces/IArtist";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
const { Title, Text } = Typography;
import styles from "./ArtistCard.module.css";

interface ArtistCardProps {
    artist: IArtist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
    const navigate = useNavigate();

    return (
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
        </Card>
    );
};

export default ArtistCard;
