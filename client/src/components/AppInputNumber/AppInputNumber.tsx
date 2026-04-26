import { InputNumber } from "antd";
import styles from "./AppInputNumber.module.css";

const AppInputNumber = ({
    className,
    ...rest
}: React.ComponentProps<typeof InputNumber>) => {
    return (
        <InputNumber
            {...rest}
            className={`${styles.app_input_number} ${className || ""}`}
            min={1}
            max={200000000}
        />
    );
};
export default AppInputNumber;
