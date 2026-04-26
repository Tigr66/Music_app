export const appRoutes = {
    MAIN_PAGE: "/",
    LOGIN_PAGE: "/login",
    REGISTER_PAGE: "/registration",
    TRACK_HISTORY_PAGE: "/profile/track-history",
    ARTISTS_PAGE: "/artists",
    ADD_ARTIST_PAGE: "/artists/add",
    ADD_ALBUM_PAGE: "/albums/add",
    ARTIST_ALBUMS_PAGE: "/artists/:id/albums",
    ALBUMS_TRACKS_PAGE: "/albums/:id/tracks",
} as const;
