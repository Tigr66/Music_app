import { Alert, Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader/AppHeader";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearError } from "../store/musicSlice/musicSlice";
import styles from "./MainLayout.module.css";
const { Content } = Layout;

const MainLayout = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.music.error);

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
                <Outlet />
            </Content>
        </Layout>
    );
};

export default MainLayout;
