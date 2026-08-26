import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes/app-routes";

import { MainLayout } from "./layouts/MainLayout";
import { LoginPage, RegisterPage } from "./pages/Auth";
import { AddArtistPage, ArtistsPage } from "./pages/Artists";
// import AlbumsPage from "./pages/AlbumsPage/AlbumsPage";
// import TracksPage from "./pages/TracksPage/TracksPage";
// import AddAlbumPage from "./pages/AddAlbumPage/AddAlbumPage";
// import AddTrackPage from "./pages/AddTrackPage/AddTrackPage";
import RequireAuth from "./routes/guards/RequireAuth";

import "@/styles/variables.css";
import "@/styles/base.css";
import "@/styles/global.css";
import "@/styles/antd-overrides.css";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route
                        path={appRoutes.MAIN_PAGE}
                        element={<ArtistsPage />}
                    />
                    <Route
                        path={appRoutes.ARTISTS_PAGE}
                        element={<ArtistsPage />}
                    />
                    {/* <Route
                        path={appRoutes.ARTIST_ALBUMS_PAGE}
                        element={<AlbumsPage />}
                    />
                    <Route
                        path={appRoutes.ALBUMS_TRACKS_PAGE}
                        element={<TracksPage />}
                    /> */}
                    <Route
                        path={appRoutes.LOGIN_PAGE}
                        element={<LoginPage />}
                    />
                    <Route
                        path={appRoutes.REGISTER_PAGE}
                        element={<RegisterPage />}
                    />
                    <Route element={<RequireAuth />}>
                        {/* <Route
                            path={appRoutes.TRACK_HISTORY_PAGE}
                            element={<TrackHistoryPage />}
                        /> */}
                        <Route
                            path={appRoutes.ADD_ARTIST_PAGE}
                            element={<AddArtistPage />}
                        />
                        {/* <Route
                            path={appRoutes.ADD_ALBUM_PAGE}
                            element={<AddAlbumPage />}
                        />
                        <Route
                            path={appRoutes.ADD_TRACK_PAGE}
                            element={<AddTrackPage />}
                        /> */}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
