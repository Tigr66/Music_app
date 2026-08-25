import { store } from "@/store/store";
import type { ReactNode } from "react";
import { Provider } from "react-redux";

interface AppStoreProviderProps {
    children: ReactNode;
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
    return <Provider store={store}>{children}</Provider>;
};
