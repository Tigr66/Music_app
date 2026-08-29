import { Flex, Typography } from "antd";
import type React from "react";
import styles from "./AddFormWrapper.module.css";

interface AddFormWrapperProps {
    title: string;
    children: React.ReactNode;
}

const AddFormWrapper = ({ title, children }: AddFormWrapperProps) => {
    return (
        <>
            <Typography.Title>{title}</Typography.Title>
            <Flex
                vertical
                align="left"
                justify="left"
                className={styles.add_form_wrapper}
            >
                {children}
            </Flex>
        </>
    );
};

export default AddFormWrapper;
