import { Badge } from "antd";

interface PublishBadgeProps {
    isPublished: boolean;
    children: React.ReactNode;
}

const PublishBadge = ({ isPublished, children }: PublishBadgeProps) => {
    if (isPublished) return <>{children}</>;

    return (
        <Badge.Ribbon text="UNPUBLISHED" color="volcano">
            {children}
        </Badge.Ribbon>
    );
};

export default PublishBadge;
