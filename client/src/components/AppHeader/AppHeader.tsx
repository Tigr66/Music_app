import { Layout } from "antd";
import { Link } from "react-router-dom";
import { appRoutes } from "../../routes/appRoutes";
const { Header } = Layout;
import styles from "./AppHeader.module.css";

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
