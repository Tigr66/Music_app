import { Card } from "antd";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { useNavigate } from "react-router-dom";
import type { IAlbum } from "../../interfaces/IAlbum";
const { Meta } = Card;
import styles from "./AlbumCard.module.css";

interface AlbumCardProps {
    album: IAlbum;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
    const navigate = useNavigate();

    return (
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
                    <span className={styles.album_card_text}>
                        {album.title}
                    </span>
                }
                // description={
                //     <span className={styles.album_card_text}>
                //         {album.info}
                //     </span>
                // }
            />
        </Card>
    );
};

export default AlbumCard;
