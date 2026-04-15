import { useEffect, useState } from "react";
import { Avatar, Flex, Layout, Typography } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
    clearError,
    clearInfo,
    clearSuccess,
} from "../store/musicSlice/musicSlice";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { HistoryOutlined, UserOutlined } from "@ant-design/icons";
import { appRoutes } from "../routes/appRoutes";
import AppHeader from "../components/AppHeader/AppHeader";
import styles from "./MainLayout.module.css";
const { Content, Sider } = Layout;
const { Title } = Typography;

const MainLayout = () => {
    const dispatch = useAppDispatch();
    const success = useAppSelector((state) => state.music.success);
    const error = useAppSelector((state) => state.music.error);
    const info = useAppSelector((state) => state.music.info);
    const user = useAppSelector((state) => state.music.user);

    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (success) {
            toast.success(success);
            dispatch(clearSuccess());
        }
    }, [success, dispatch]);

    useEffect(() => {
        if (info) {
            toast.info(info);
            dispatch(clearInfo());
        }
    }, [info, dispatch]);

    return (
        <Layout className={styles.main_layout}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                className={styles.sider}
                trigger={null}
                width={collapsed ? 30 : 220}
            >
                <Flex vertical align="center" style={{ height: "100vh" }}>
                    {user ? (
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
                            {!collapsed && <Title level={2}>Username</Title>}
                        </Flex>
                    ) : (
                        <NavLink
                            to={appRoutes.LOGIN_PAGE}
                            className={styles.sidebar_link}
                        >
                            <UserOutlined /> {!collapsed && "login"}
                        </NavLink>
                    )}
                    <NavLink
                        to={appRoutes.TRACK_HISTORY_PAGE}
                        className={styles.sidebar_link}
                    >
                        <HistoryOutlined /> {!collapsed && "Track history"}
                    </NavLink>

                    <button
                        className={styles.toggle_button}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? ">" : "<"}
                    </button>
                </Flex>
            </Sider>
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
