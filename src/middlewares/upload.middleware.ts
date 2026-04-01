import multer from "multer";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

const createUploader = (folder: string) => {
    const dir = path.resolve(__dirname, `../../uploads/${folder}`);
    fs.mkdirSync(dir, { recursive: true });

    return multer({
        storage: multer.diskStorage({
            destination: (_req, _file, cb) => {
                cb(null, dir);
            },
            filename: (_req, file, cb) => {
                const ext = path.extname(file.originalname) || "";
                cb(null, `${randomUUID()}${ext}`);
            },
        }),
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
        fileFilter: (_req, file, cb) => {
            if (!file.mimetype.startsWith("image/")) {
                cb(new Error("Only images allowed"));
                return;
            }
            cb(null, true);
        },
    });
};

export const uploadAlbumImage = createUploader("albums");
export const uploadArtistImage = createUploader("artists");
