import { Flex, Spin } from "antd";

const Spinner = () => {
    return (
        <Flex justify="center" align="center" style={{ minHeight: "50vh" }}>
            <Spin size="large" description="Loading" />
        </Flex>
    );
};

export default Spinner;
