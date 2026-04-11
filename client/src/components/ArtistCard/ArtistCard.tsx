import { Card } from "antd";
import type { IArtist } from "../../interfaces/IArtist";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
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
                    <span className={styles.artist_card_text}>
                        {artist.name}
                    </span>
                }
                description={
                    <span className={styles.artist_card_text}>
                        {artist.info}
                    </span>
                }
            />
        </Card>
    );
};

export default ArtistCard;
