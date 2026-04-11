import { Alert, Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader/AppHeader";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearError } from "../store/musicSlice/musicSlice";
import styles from "./MainLayout.module.css";
const { Content } = Layout;

const MainLayout = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.music.error);
    const isLoading = useAppSelector((state) => state.music.isLoading);

    return (
        <Layout className={styles.main_layout}>
            <AppHeader />
            <Content className={styles.content}>
                {error && (
                    <Alert
                        className={styles.app_alert}
                        onClick={() => dispatch(clearError())}
                        closable
                        description={error}
                        type="error"
                        showIcon
                    />
                )}
                <Spin
                    spinning={isLoading}
                    description="Loading"
                    size="large"
                    fullscreen
                />
                <Outlet />
            </Content>
        </Layout>
    );
};

export default MainLayout;
