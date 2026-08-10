import cors from "cors";
import express from "express";
import fs from "fs";
import "reflect-metadata";
import { ArtistsRoutes } from "./routes/artists.routes";
import { TracksRoutes } from "./routes/tracks.routes";
import { AlbumsRoutes } from "./routes/albums.routes";
import { albumsUploads, artistsUploads } from "./config/path";
import { AuthRoutes } from "./routes/auth.routes";
import { TrackHistoryRoutes } from "./routes/track_history.routes";
import { ErrorMiddleware } from "./middlewares/error.middleware";

const app = express();
const PORT = 8000;

const artistsRoutes = new ArtistsRoutes();
const tracksRoutes = new TracksRoutes();
const albumsRoutes = new AlbumsRoutes();
const authRoutes = new AuthRoutes();
const trackHistoryRoutes = new TrackHistoryRoutes();

fs.mkdirSync(artistsUploads, { recursive: true });
fs.mkdirSync(albumsUploads, { recursive: true });

app.use("/uploads/artists", express.static(artistsUploads));
app.use("/uploads/albums", express.static(albumsUploads));

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/uploads/albums", express.static(albumsUploads));
app.use("/uploads/artists", express.static(artistsUploads));

app.use("/artists", artistsRoutes.router);
app.use("/tracks", tracksRoutes.router);
app.use("/albums", albumsRoutes.router);
app.use("/auth", authRoutes.router);
app.use("/track_history", trackHistoryRoutes.router);

app.use(ErrorMiddleware.handle);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
