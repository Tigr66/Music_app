import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
import { useScreen } from "@/hooks/useScreens";
import { AppDrawer } from "./components/AppDrawer";
import { AppSider } from "./components/AppSider";
import { useState } from "react";
import styles from "./MainLayout.module.css";

const { Content } = Layout;

const MainLayout = () => {
    const { isDesktop } = useScreen();

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Layout className={styles.main_layout}>
            {isDesktop ? (
                <AppSider />
            ) : (
                <AppDrawer open={open} onClose={() => setOpen(false)} />
            )}

            <Layout style={{ background: "transparent" }}>
                <AppHeader onMenuClick={() => setOpen(!open)} />

                <Content className={styles.content}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
