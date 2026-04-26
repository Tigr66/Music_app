import { Input } from "antd";
import styles from "./AppTextArea.module.css";

const AppTextArea = ({
    className,
    ...rest
}: React.ComponentProps<typeof Input.TextArea>) => {
    return (
        <Input.TextArea
            {...rest}
            className={`${styles.app_text_area} ${className || ""}`}
            rows={6}
        />
    );
};
export default AppTextArea;
