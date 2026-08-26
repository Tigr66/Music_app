import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { AppHeader } from "./components/AppHeader";
import styles from "./MainLayout.module.css";

const { Content, Sider } = Layout;

const MainLayout = () => {
    return (
        <Layout className={styles.main_layout}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                className={styles.sider}
                trigger={null}
                width={collapsed ? 30 : 220}
            ></Sider>

            <Layout style={{ background: "transparent" }}>
                <AppHeader />

                <Content className={styles.content}>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        transition={Bounce}
                    />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
