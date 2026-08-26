import { Drawer } from "antd";
import { SidebarPanel } from "../SidebarPanel";
import styles from "./AppDrawer.module.css";

interface AppDrawerProps {
    open: boolean;
    onClose: () => void;
}

const AppDrawer = ({ open, onClose }: AppDrawerProps) => {
    return (
        <Drawer
            placement="left"
            open={open}
            onClose={onClose}
            size="85%"
            closeIcon={false}
            className={styles.app_drawer}
        >
            <SidebarPanel onToggle={onClose} mobile />
        </Drawer>
    );
};

export default AppDrawer;
