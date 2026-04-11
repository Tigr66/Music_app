import { FrownOutlined } from "@ant-design/icons";
import { Result, Typography } from "antd";
const { Title } = Typography;

interface EmptyMessageProps {
    message: string;
}

const EmptyMessage = ({ message }: EmptyMessageProps) => {
    return (
        <Result
            icon={<FrownOutlined style={{ color: "#dcdadb" }} />}
            title={
                <Title style={{ color: "#dcdadb", margin: 0 }}>{message}</Title>
            }
        />
    );
};

export default EmptyMessage;
