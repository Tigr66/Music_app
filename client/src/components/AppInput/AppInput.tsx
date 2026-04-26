import { Input } from "antd";
import styles from "./AppInput.module.css";

const AppInput = ({
    className,
    ...rest
}: React.ComponentProps<typeof Input>) => {
    return (
        <Input {...rest} className={`${styles.app_input} ${className || ""}`} />
    );
};
export default AppInput;
