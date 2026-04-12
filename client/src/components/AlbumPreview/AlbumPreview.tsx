import { Flex, Typography } from "antd";
import { Image } from "antd";
import { useAppSelector } from "../../store/store";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
const { Title } = Typography;

const AlbumPreview = () => {
    const currentAlbum = useAppSelector((state) => state.music.currentAlbum);
    const currentArtist = useAppSelector((state) => state.music.currentArtist);

    return currentAlbum ? (
        <Flex gap={30}>
            <Image
                width={400}
                alt={currentAlbum.title}
                src={resolveImageUrl(currentAlbum.cover)}
                style={{ borderRadius: 8 }}
                preview={false}
            />
            <Flex vertical justify="center" align="start">
                <Title level={4} style={{ fontSize: 24 }}>
                    By {currentArtist?.name}
                </Title>
                <Title style={{ fontSize: 100, margin: 0 }}>
                    {currentAlbum.title}
                </Title>
            </Flex>
        </Flex>
    ) : null;
};

export default AlbumPreview;
