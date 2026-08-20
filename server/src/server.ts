import cors from "cors";
import express from "express";
import fs from "fs";
import "reflect-metadata";
import { ArtistRoutes } from "./routes/artist.routes";
import { TrackRoutes } from "./routes/track.routes";
import { AlbumRoutes } from "./routes/album.routes";
import { albumsUploads, artistsUploads } from "./config/path";
import { AuthRoutes } from "./routes/auth.routes";
import { TrackHistoryRoutes } from "./routes/track-history.routes";
import { ErrorMiddleware } from "./middlewares/error.middleware";

const app = express();
const PORT = 8000;

const artistRoutes = new ArtistRoutes();
const trackRoutes = new TrackRoutes();
const albumRoutes = new AlbumRoutes();
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

app.use("/artists", artistRoutes.router);
app.use("/tracks", trackRoutes.router);
app.use("/albums", albumRoutes.router);
app.use("/auth", authRoutes.router);
app.use("/track-histories", trackHistoryRoutes.router);

app.use(ErrorMiddleware.handle);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
