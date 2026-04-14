import { Flex } from "antd";
import AuthForm from "../../components/AuthForm/AuthForm";

const LoginPage = () => {
    return (
        <Flex justify="center" align="center" style={{height: "100%"}}>
            <AuthForm isLogin={true} />
        </Flex>
    );
};

export default LoginPage;
