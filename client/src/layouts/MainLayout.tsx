import { useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearError, clearSuccess } from "../store/musicSlice/musicSlice";
import { Bounce, toast, ToastContainer } from "react-toastify";
import AppHeader from "../components/AppHeader/AppHeader";
const { Content } = Layout;
import styles from "./MainLayout.module.css";

const MainLayout = () => {
    const dispatch = useAppDispatch();
    const success = useAppSelector((state) => state.music.success);
    const error = useAppSelector((state) => state.music.error);

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
