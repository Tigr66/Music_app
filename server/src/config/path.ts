import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadsPath = path.resolve(__dirname, "../../uploads");

export const artistsUploads = path.join(uploadsPath, "artists");
export const albumsUploads = path.join(uploadsPath, "albums");