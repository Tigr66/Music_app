import { Layout } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;

const AppHeader = () => {
    return (
        <Header>
            <Link
                to="/"
                style={{
                    color: "white",
                    fontSize: 36,
                    fontWeight: 600,
                }}
            >
                Music app
            </Link>
        </Header>
    );
};

export default AppHeader;
