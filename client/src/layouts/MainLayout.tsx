import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader/AppHeader";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearError } from "../store/musicSlice/musicSlice";
import styles from "./MainLayout.module.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
const { Content } = Layout;

const MainLayout = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.music.error);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    return (
        <Layout className={styles.main_layout}>
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
    );
};

export default MainLayout;
