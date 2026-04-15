import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage/MainPage";
import AlbumsPage from "./pages/AlbumsPage/AlbumsPage";
import TracksPage from "./pages/TracksPage/TracksPage";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

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
                    <Route
                        path={appRoutes.ARTIST_ALBUMS_PAGE}
                        element={<AlbumsPage />}
                    />
                    <Route
                        path={appRoutes.ALBUMS_TRACKS_PAGE}
                        element={<TracksPage />}
                    />
                    <Route
                        path={appRoutes.LOGIN_PAGE}
                        element={<LoginPage />}
                    />
                    <Route
                        path={appRoutes.REGISTER_PAGE}
                        element={<RegisterPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
