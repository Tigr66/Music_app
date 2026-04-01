import cors from "cors";
import express from "express";
import path from "path";
import fs from "fs";
import { ArtistsRoutes } from "./routes/artists.routes";
import { TracksRoutes } from "./routes/tracks.routes";
import { AlbumsRoutes } from "./routes/albums.routes";

const app = express();
const PORT = 8000;

const artistsRoutes = new ArtistsRoutes();
const tracksRoutes = new TracksRoutes();
const albumsRoutes = new AlbumsRoutes();

const albumsUploads = path.resolve(__dirname, "../uploads/album");
fs.mkdirSync(albumsUploads, { recursive: true });

const artistsUploads = path.resolve(__dirname, "../uploads/artist");
fs.mkdirSync(artistsUploads, { recursive: true });

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/uploads/albums", express.static(albumsUploads));
app.use("/uploads/artists", express.static(artistsUploads));

app.use("/artists", artistsRoutes.router);
app.use("/tracks", tracksRoutes.router);
app.use("/albums", albumsRoutes.router);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
