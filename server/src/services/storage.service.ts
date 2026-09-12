import * as Minio from "minio";
import { minioClient } from "../lib/minio";
import { DeleteFileData, UploadFileData } from "../types/storage.types";
import { minioConfig } from "../config/minio.config";
import { InternalServerError } from "../errors/internal-server-error";
import { randomUUID } from "crypto";
import { fileExtensions } from "../config/file-extensions.config";

export class StorageService {
    private minioClient: Minio.Client;
    private bucketName: string;

    constructor() {
        this.minioClient = minioClient;
        this.bucketName = minioConfig.bucket;
    }

    async upload(file: UploadFileData): Promise<string> {
        const extension = fileExtensions[file.contentType];

        if (!extension) {
            throw new InternalServerError("Unsupported file type");
        }

        try {
            const bucketName = file.bucketName ?? this.bucketName;

            const objectName = `${file.folder ? `${file.folder}/` : ""}${randomUUID()}${extension}`;

            await this.minioClient.putObject(
                bucketName,
                objectName,
                file.buffer,
                file.buffer.length,
                {
                    "Content-Type": file.contentType,
                },
            );

            return objectName;
        } catch (error) {
            throw new InternalServerError("Failed to upload file to storage");
        }
    }

    async delete(fileData: DeleteFileData): Promise<void> {
        const bucketName = fileData.bucketName ?? this.bucketName;

        const exists = await this.exists({
            bucketName,
            objectName: fileData.objectName,
        });

        if (!exists) {
            return;
        }

        try {
            await this.minioClient.removeObject(
                bucketName,
                fileData.objectName,
            );
        } catch {
            throw new InternalServerError("Failed to delete file from storage");
        }
    }

    async exists(fileData: DeleteFileData): Promise<boolean> {
        try {
            await this.minioClient.statObject(
                fileData.bucketName ?? this.bucketName,
                fileData.objectName,
            );

            return true;
        } catch (error) {
            if (
                typeof error === "object" &&
                error !== null &&
                "code" in error &&
                error.code === "NotFound"
            ) {
                return false;
            }

            throw new InternalServerError("Failed to check file in storage");
        }
    }
}
