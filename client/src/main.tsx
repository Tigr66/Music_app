import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { App as AntApp } from "antd";
import { AppConfigProvider, AppErrorBoundary } from "./config";

import App from "./App.tsx";
import React from "react";

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <AppConfigProvider>
                <AntApp>
                    <App />
                </AntApp>
            </AppConfigProvider>
        </Provider>
    </React.StrictMode>,
);
