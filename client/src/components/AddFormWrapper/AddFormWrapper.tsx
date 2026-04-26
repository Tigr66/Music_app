import { Flex } from "antd";
import type React from "react";

interface AddFormWrapperProps {
    children: React.ReactNode;
}

const AddFormWrapper = ({ children }: AddFormWrapperProps) => {
    return (
        <Flex vertical align="left" justify="left">
            {children}
        </Flex>
    );
};

export default AddFormWrapper;
