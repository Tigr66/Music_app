import { Flex, Typography } from "antd";
import type React from "react";
import { useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../routes/appRoutes";

interface AddFormWrapperProps {
    title: string;
    children: React.ReactNode;
}

const AddFormWrapper = ({ title, children }: AddFormWrapperProps) => {
    const user = useAppSelector((state) => state.music.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.info("To create please log in");
            navigate({
                pathname: appRoutes.LOGIN_PAGE,
            });
        }
    }, []);

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
