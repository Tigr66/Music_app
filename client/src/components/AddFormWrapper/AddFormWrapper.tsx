import { Flex, Typography } from "antd";
import type React from "react";

interface AddFormWrapperProps {
    title: string;
    children: React.ReactNode;
}

const AddFormWrapper = ({ title, children }: AddFormWrapperProps) => {

    return (
        <>
            <Typography.Title>{title}</Typography.Title>
            <Flex vertical align="left" justify="left">
                {children}
            </Flex>
        </>
    );
};

export default AddFormWrapper;
