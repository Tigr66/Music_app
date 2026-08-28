import { Button, Flex, Form, Typography } from "antd";
import { Link } from "react-router-dom";
import { FormInput } from "@/components/form";
import { appRoutes } from "@/routes/app-routes";
import type { AuthFormType } from "@/types/auth/auth-form.types";
import useAuthForm from "@/pages/Auth/hooks/useAuthForm";
import styles from "./AuthForm.module.css";

const { Title, Text } = Typography;

interface AuthFormProps {
    isLogin: boolean;
}

const AuthForm = ({ isLogin }: AuthFormProps) => {
    const { form, isSending, handleAuth } = useAuthForm(isLogin);

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            className={styles.auth_window}
        >
            <Title>{isLogin ? "Log in" : "Sign up"}</Title>

            <Form<AuthFormType>
                form={form}
                name="basic"
                style={{ width: 320 }}
                layout="vertical"
                onFinish={(values) => handleAuth(values)}
                autoComplete="off"
            >
                <FormInput<AuthFormType>
                    label="Username"
                    name="username"
                    required
                />

                <FormInput<AuthFormType>
                    label="Password"
                    name="password"
                    password
                    required
                />

                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.auth_form_button}
                    loading={isSending}
                >
                    Submit
                </Button>
            </Form>

            <Flex justify="center" align="center" gap={5}>
                <Text>
                    {isLogin
                        ? "Don’t have an account?"
                        : "Already have an account?"}
                </Text>
                <Link
                    to={
                        isLogin ? appRoutes.REGISTER_PAGE : appRoutes.LOGIN_PAGE
                    }
                >
                    {isLogin ? "Sign up" : "Log in"}
                </Link>
            </Flex>
        </Flex>
    );
};

export default AuthForm;
