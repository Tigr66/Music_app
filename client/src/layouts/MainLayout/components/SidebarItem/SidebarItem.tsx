import type { NavItem } from "@/types/navigation/navigation.types";
import { Tooltip } from "antd";
import { NavLink } from "react-router-dom";
import styles from "./SidebarItem.module.css";

interface SidebarItemProps {
    item: NavItem;
    collapsed?: boolean;
    mobile?: boolean;
    onToggle: () => void;
}

const SidebarItem = ({
    item,
    collapsed,
    mobile,
    onToggle,
}: SidebarItemProps) => {
    const Icon = item.icon;

    return (
        <Tooltip
            title={item.label}
            placement="right"
            open={collapsed && !mobile ? undefined : false}
        >
            <NavLink
                to={item.path}
                onClick={mobile ? onToggle : undefined}
                className={({ isActive }) =>
                    [
                        styles.sidebar_link,
                        isActive ? styles.active : "",
                        // collapsed ? styles.collapsed : "",
                    ].join(" ")
                }
            >
                <Icon />
                {!collapsed && item.label}
            </NavLink>
        </Tooltip>
    );
};

export default SidebarItem;
