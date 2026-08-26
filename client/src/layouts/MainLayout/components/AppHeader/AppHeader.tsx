import { Layout } from "antd";
import { appRoutes } from "@/routes/app-routes";
import { Link } from "react-router-dom";
import styles from "./AppHeader.module.css";

const { Header } = Layout;

const AppHeader = () => {
    return (
        <Header className={styles.app_header}>
            <Link to={appRoutes.MAIN_PAGE} className={styles.header_link}>
                Music app
            </Link>
        </Header>
    );
};

export default AppHeader;
