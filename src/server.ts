import cors from "cors";
import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 8000;

const albumsUploads = path.resolve(__dirname, "../uploads/album");
fs.mkdirSync(albumsUploads, { recursive: true });

const artistsUploads = path.resolve(__dirname, "../uploads/artist");
fs.mkdirSync(artistsUploads, { recursive: true });

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/albumsUploads", express.static(albumsUploads));
app.use("/artistsUploads", express.static(artistsUploads));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
