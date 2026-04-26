import { Select } from "antd";
import styles from "./AppSelect.module.css";

const AppSelect = ({
    className,
    ...rest
}: React.ComponentProps<typeof Select>) => {
    return (
        <Select
            {...rest}
            className={`${styles.app_select} ${className || ""}`}
        />
    );
};

export default AppSelect;
