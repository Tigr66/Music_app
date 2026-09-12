import * as Minio from "minio";
import { minioClient } from "../lib/minio";
import { UploadFileData } from "../types/storage.types";
import { minioConfig } from "../config/minio.config";
import { InternalServerError } from "../errors/internal-server-error";
import { randomUUID } from "crypto";
import { BadRequestError } from "../errors/bad-request-error";
import { fileExtensions } from "../config/file-extensions.config";

export class StorageService {
    private minioClient: Minio.Client;

    constructor() {
        this.minioClient = minioClient;
    }

    async upload(file: UploadFileData): Promise<string> {
        const extension = fileExtensions[file.contentType];

        if (!extension) {
            throw new InternalServerError("Unsupported file type");
        }

        try {
            const bucketName = file.bucketName ?? minioConfig.bucket;

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
}
