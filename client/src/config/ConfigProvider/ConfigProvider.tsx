import { ConfigProvider } from "antd";
import { antdTheme } from "../ThemeConfig/antdTheme";

import enUS from "antd/locale/en_US";
import "antd/dist/reset.css";

import type { ReactNode } from "react";

interface AppConfigProviderProps {
    children: ReactNode;
}

export const AppConfigProvider = ({ children }: AppConfigProviderProps) => {
    return (
        <ConfigProvider locale={enUS} theme={antdTheme}>
            {children}
        </ConfigProvider>
    );
};
