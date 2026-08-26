import { Avatar, Flex, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    LoadingOutlined,
    LogoutOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { navItems } from "./nav-items";
import { logoutUserThunk } from "@/store/authSlice/authThunks";
import { SidebarItem } from "../SidebarItem";
import styles from "./SidebarPanel.module.css";

const { Title } = Typography;

interface SidebarPanelProps {
    collapsed?: boolean;
    onToggle: () => void;
    mobile?: boolean;
}

const SidebarPanel = ({ collapsed, onToggle, mobile }: SidebarPanelProps) => {
    const dispatch = useAppDispatch();

    const { user, isSending } = useAppSelector((state) => state.auth);

    const filterItems = navItems.filter((item) =>
        item.roles.includes(user ? user.role : "GUEST"),
    );

    return (
        <Flex align="center" vertical>
            {user && (
                <Flex
                    vertical
                    justify="center"
                    align="center"
                    style={{ paddingTop: 10 }}
                >
                    <Avatar
                        size={collapsed ? 48 : 72}
                        icon={<UserOutlined />}
                        style={{ backgroundColor: "#4f4f4f" }}
                    />
                    {!collapsed && <Title level={2}>{user.username}</Title>}
                </Flex>
            )}

            <Flex className="sider-nav" align="center" vertical>
                {filterItems.map((item) => (
                    <SidebarItem
                        key={item.path}
                        item={item}
                        collapsed={collapsed}
                        mobile={mobile}
                        onToggle={onToggle}
                    />
                ))}
            </Flex>

            {user && (
                <button
                    onClick={() => dispatch(logoutUserThunk())}
                    disabled={isSending}
                    className={styles.sidebar_button}
                >
                    <LogoutOutlined /> {!collapsed && "Logout"}{" "}
                    {isSending && <LoadingOutlined />}
                </button>
            )}

            <button
                className={[
                    styles.toggle_button,
                    mobile && styles.toggle_mobile,
                ].join(" ")}
                onClick={onToggle}
            >
                {mobile ? "< Hide menu" : collapsed ? ">" : "<"}
            </button>
        </Flex>
    );
};

export default SidebarPanel;
