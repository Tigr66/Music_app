import fs from "fs/promises";
import path from "path";

export const removeFile = async (filePath?: string | null) => {
    if (!filePath) return;

    const fullPath = path.resolve("uploads", filePath.replace("/uploads/", ""));

    try {
        await fs.unlink(fullPath);
    } catch (e) {
        console.error("Error deleting file:", e);
    }
};
