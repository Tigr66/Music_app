import { Button, Flex } from "antd";

interface AdminCardActionsProps {
    onPublish: () => void;
    onDelete: () => void;
    isPublished: boolean;
    isSending: boolean;
    vertical?: boolean;
}

const AdminCardActions = ({
    onPublish,
    onDelete,
    isPublished,
    isSending,
    vertical,
}: AdminCardActionsProps) => {
    return (
        <Flex vertical={vertical} gap={10} style={{ padding: 10 }}>
            {!isPublished && (
                <Button
                    type="primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        onPublish();
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
                    onDelete();
                }}
                type="primary"
                style={{ width: "100%" }}
                loading={isSending}
                danger
            >
                Delete
            </Button>
        </Flex>
    );
};

export default AdminCardActions;
