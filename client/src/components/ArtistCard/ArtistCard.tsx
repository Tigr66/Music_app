import { Card } from "antd";
import type { IArtist } from "../../interfaces/IArtist";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

interface ArtistCardProps {
    artist: IArtist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
    const navigate = useNavigate();

    return (
        <Card
            hoverable
            style={{ width: 240 }}
            onClick={() =>
                navigate({ pathname: `/artists/${artist.id}/albums` })
            }
            cover={
                <img
                    draggable={false}
                    style={{
                        objectFit: "cover",
                        maxHeight: "300px",
                        minHeight: "300px",
                    }}
                    alt={artist.name}
                    src={resolveImageUrl(artist.photo)}
                />
            }
        >
            <Meta title={artist.name} description={artist.info} />
        </Card>
    );
};

export default ArtistCard;
