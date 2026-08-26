import { Layout } from "antd";
import { appRoutes } from "@/routes/app-routes";
import { Link } from "react-router-dom";
import { useScreen } from "@/hooks/useScreens";
import styles from "./AppHeader.module.css";

const { Header } = Layout;

interface AppHeaderProps {
    onMenuClick?: () => void;
}

const AppHeader = ({ onMenuClick }: AppHeaderProps) => {
    const { isDesktop } = useScreen();

    return (
        <Header className={styles.app_header}>
            {!isDesktop && (
                <button onClick={onMenuClick} className={styles.menu_button}>
                    ☰
                </button>
            )}

            <Link to={appRoutes.MAIN_PAGE} className={styles.header_link}>
                Music app
            </Link>
        </Header>
    );
};

export default AppHeader;
