import { Alert, Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader/AppHeader";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearError } from "../store/musicSlice/musicSlice";
const { Content } = Layout;

const MainLayout = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.music.error);
    const isLoading = useAppSelector((state) => state.music.isLoading);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AppHeader />
            <Content
                style={{
                    backgroundColor: "#f5f5f5",
                    flex: 1,
                    position: "relative",
                }}
            >
                {error && (
                    <Alert
                        style={{
                            position: "absolute",
                            minWidth: 300,
                            right: 10,
                            top: 80,
                        }}
                        onClick={() => dispatch(clearError())}
                        closable
                        description={error}
                        type="error"
                        showIcon
                    />
                )}
                <Spin spinning={isLoading}>
                    <Outlet />
                </Spin>
            </Content>
        </Layout>
    );
};

export default MainLayout;
