import { Select } from "antd";

const AppSelect = (props: React.ComponentProps<typeof Select>) => {
    return (
        <Select
            {...props}
            style={{
                width: "20%",
                color: "#151312",
            }}
        />
    );
};

export default AppSelect;
