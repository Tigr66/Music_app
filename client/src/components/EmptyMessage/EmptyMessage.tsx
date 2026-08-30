import { FrownOutlined } from "@ant-design/icons";
import { Result, Typography } from "antd";
import type { ReactNode } from "react";

const { Title } = Typography;

interface EmptyMessageProps {
    message: string;
    icon?: ReactNode;
}

const EmptyMessage = ({
    message,
    icon = <FrownOutlined />,
}: EmptyMessageProps) => {
    return (
        <Result
            icon={icon}
            title={<Title style={{ margin: 0 }}>{message}</Title>}
        />
    );
};

export default EmptyMessage;
