import { Button, Flex, Form, Input, Typography } from "antd";
import type { AuthFormType } from "../../types/AuthFormType";
import styles from "./AuthForm.module.css";
import { toast } from "react-toastify";
import type { IAuthUser } from "../../interfaces/IAuthUser";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
    loginUserThunk,
    registerUserThunk,
} from "../../store/musicSlice/musicThunks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { appRoutes } from "../../routes/appRoutes";
const { Title } = Typography;

interface AuthFormProps {
    isLogin: boolean;
}

const AuthForm = ({ isLogin }: AuthFormProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const isSending = useAppSelector((state) => state.music.isSending);
    const success = useAppSelector((state) => state.music.success);

    const handleAuth = (data: AuthFormType) => {
        const user: IAuthUser = {
            username: data.username.trim(),
            password: data.password.trim(),
        };

        if (isLogin) {
            dispatch(loginUserThunk(user));
        } else {
            dispatch(registerUserThunk(user));
        }

        form.resetFields();
    };

    useEffect(() => {
        if (success) {
            navigate({ pathname: appRoutes.ARTISTS_PAGE});
        }
    }, [success]);

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            className={styles.auth_window}
        >
            <Title>{isLogin ? "Log in" : "Register"}</Title>
            <Form
                form={form}
                name="basic"
                style={{ width: 320 }}
                layout="vertical"
                onFinish={(values) => handleAuth(values)}
                onFinishFailed={() => toast.error("Please complete the form")}
                autoComplete="off"
            >
                <Form.Item<AuthFormType>
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<AuthFormType>
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.auth_form_button}
                        disabled={isSending}
                        loading={isSending}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default AuthForm;
