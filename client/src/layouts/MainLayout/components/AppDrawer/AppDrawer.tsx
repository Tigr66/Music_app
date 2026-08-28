import { Drawer } from "antd";
import { SidebarPanel } from "../SidebarPanel";
import { useScreen } from "@/hooks/useScreens";
import styles from "./AppDrawer.module.css";

interface AppDrawerProps {
    open: boolean;
    onClose: () => void;
}

const AppDrawer = ({ open, onClose }: AppDrawerProps) => {
    const { isMobile  } = useScreen();

    const size = isMobile ? "85%" : "40%";

    return (
        <Drawer
            placement="left"
            open={open}
            onClose={onClose}
            size={size}
            closeIcon={false}
            classNames={{
                body: styles.app_drawer,
            }}
        >
            <SidebarPanel onToggle={onClose} mobile />
        </Drawer>
    );
};

export default AppDrawer;
