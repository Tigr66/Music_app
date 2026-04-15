import { Flex } from "antd";
import AuthForm from "../../components/AuthForm/AuthForm";

const RegisterPage = () => {
    return (
        <Flex justify="center" align="center" style={{ height: "100%" }}>
            <AuthForm isLogin={false} />
        </Flex>
    );
};

export default RegisterPage;
