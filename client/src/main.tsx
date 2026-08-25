import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ConfigProvider } from "antd";
import { antdTheme } from "./theme/antdTheme.ts";
import App from "./App.tsx";
import "antd/dist/reset.css";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <ConfigProvider theme={antdTheme}>
            <App />
        </ConfigProvider>
    </Provider>,
);
