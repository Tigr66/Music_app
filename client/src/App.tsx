import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import MainLayout from "./layouts/MainLayout";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path={appRoutes.MAIN_PAGE} element={<MainPage />} />
                    <Route
                        path={appRoutes.ARTISTS_PAGE}
                        element={<MainPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
