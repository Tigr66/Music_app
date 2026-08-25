import { createRoot } from "react-dom/client";
import { App as AntApp } from "antd";
import {
    AppConfigProvider,
    AppErrorBoundary,
    AppStoreProvider,
} from "./config";

import App from "./App.tsx";
import React from "react";

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppStoreProvider>
            <AppConfigProvider>
                <AntApp>
                    <AppErrorBoundary>
                        <App />
                    </AppErrorBoundary>
                </AntApp>
            </AppConfigProvider>
        </AppStoreProvider>
    </React.StrictMode>,
);
