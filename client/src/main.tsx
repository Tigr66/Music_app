import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { antdTheme } from "./theme/antdTheme.ts";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <ConfigProvider theme={antdTheme}>
            <App />
        </ConfigProvider>
    </Provider>,
);
