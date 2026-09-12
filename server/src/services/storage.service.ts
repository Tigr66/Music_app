import * as Minio from "minio";
import { minioClient } from "../lib/minio";
import {
    DeleteFileData,
    GetFileUrlData,
    UploadFileData,
    UploadFileFromPathData,
} from "../types/storage.types";
import { minioConfig } from "../config/minio.config";
import { InternalServerError } from "../errors/internal-server-error";
import { randomUUID } from "crypto";
import { fileExtensions } from "../config/file-extensions.config";

export class StorageService {
    private minioClient: Minio.Client;
    private readonly bucketName: string;
    private readonly presignedUrlExpiration: number;

    constructor() {
        this.minioClient = minioClient;
        this.bucketName = minioConfig.bucket;
        this.presignedUrlExpiration = minioConfig.presignedUrlExpiration;
    }

    async upload(fileData: UploadFileData): Promise<string> {
        const extension = fileExtensions[fileData.contentType];

        if (!extension) {
            throw new InternalServerError("Unsupported file type");
        }

        try {
            const bucketName = fileData.bucketName ?? this.bucketName;

            const objectName = `${fileData.folder ? `${fileData.folder}/` : ""}${randomUUID()}${extension}`;

            await this.minioClient.putObject(
                bucketName,
                objectName,
                fileData.buffer,
                fileData.buffer.length,
                {
                    "Content-Type": fileData.contentType,
                },
            );

            return objectName;
        } catch (error) {
            throw new InternalServerError("Failed to upload file to storage");
        }
    }

    async uploadFromPath(fileData: UploadFileFromPathData): Promise<string> {
        const extension = fileExtensions[fileData.contentType];

        if (!extension) {
            throw new InternalServerError("Unsupported file type");
        }

        try {
            const objectName = `${fileData.folder ? `${fileData.folder}/` : ""}${randomUUID()}${extension}`;

            await this.minioClient.fPutObject(
                this.bucketName,
                objectName,
                fileData.filePath,
                {
                    "Content-Type": fileData.contentType,
                },
            );

            return objectName;
        } catch {
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

    async getUrl(fileData: GetFileUrlData): Promise<string> {
        try {
            return await this.minioClient.presignedGetObject(
                fileData.bucketName ?? this.bucketName,
                fileData.objectName,
                this.presignedUrlExpiration,
            );
        } catch {
            throw new InternalServerError("Failed to generate file URL");
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
