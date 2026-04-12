import { Flex, Spin } from "antd";

interface SpinnerProps {
    title: string;
}

const Spinner = ({ title }: SpinnerProps) => {
    return (
        <Flex justify="center" align="center" style={{ minHeight: "10vh" }}>
            <Spin size="large" description={title} />
        </Flex>
    );
};

export default Spinner;
