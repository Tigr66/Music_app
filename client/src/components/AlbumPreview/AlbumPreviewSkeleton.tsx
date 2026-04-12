import { Flex, Skeleton } from "antd";
const { Image } = Skeleton;

const AlbumPreviewSkeleton = () => {
    return (
        <Flex gap={30}>
            <Image
                style={{ borderRadius: 8, width: 400, height: 400 }}
                active
            />
            <Skeleton
                active
                paragraph={{
                    rows: 1,
                    width: "40%",
                }}
                title={{ width: "20%" }}
                style={{
                    marginTop: "10%",
                }}
            />
        </Flex>
    );
};

export default AlbumPreviewSkeleton;
