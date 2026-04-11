import { Layout } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;
import styles from "./AppHeader.module.css";

const AppHeader = () => {
    return (
        <Header className={styles.app_header}>
            <Link to="/" className={styles.header_link}>
                Music app
            </Link>
        </Header>
    );
};

export default AppHeader;
