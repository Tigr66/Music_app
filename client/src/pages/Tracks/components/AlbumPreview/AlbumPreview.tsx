import { useAppSelector } from "@/store/hooks";
import { Flex, Typography } from "antd";
import { Image } from "antd";

const { Title } = Typography;

const AlbumPreview = () => {
    const currentAlbum = useAppSelector((state) => state.album.currentAlbum);

    return currentAlbum ? (
        <Flex gap={30}>
            <Image
                width={400}
                height={400}
                alt={currentAlbum.title}
                src={currentAlbum.cover}
                style={{ borderRadius: 8 }}
                preview={false}
            />
            <Flex vertical justify="center" align="start">
                <Title level={4} style={{ fontSize: 24 }}>
                    By {currentAlbum.artist.name}
                </Title>
                <Title style={{ fontSize: 100, margin: 0 }}>
                    {currentAlbum.title}
                </Title>
            </Flex>
        </Flex>
    ) : null;
};

export default AlbumPreview;
