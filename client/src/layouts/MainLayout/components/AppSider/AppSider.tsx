import { Layout } from "antd";
import { useState } from "react";
import { SidebarPanel } from "../SidebarPanel";
import styles from "./AppSider.module.css";

const { Sider } = Layout;

const AppSider = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            width={210}
            collapsedWidth={80}
            className={styles.sider}
        >
            <SidebarPanel
                collapsed={collapsed}
                onToggle={() => setCollapsed(!collapsed)}
            />
        </Sider>
    );
};

export default AppSider;
