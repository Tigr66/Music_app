import fs from "fs";
import path from "path";

export const removeFile = (filePath?: string | null) => {
    if (!filePath) return;

    const fullPath = path.resolve("uploads", filePath.replace("/uploads/", ""));

    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};
