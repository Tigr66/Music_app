import * as Minio from "minio";
import { minioConfig } from "../config/minio.config";

const endPoint = process.env.MINIO_ENDPOINT;
const port = process.env.MINIO_PORT;
const accessKey = process.env.MINIO_ACCESS_KEY;
const secretKey = process.env.MINIO_SECRET_KEY;
const bucket = process.env.MINIO_BUCKET;

if (!endPoint || !port || !accessKey || !secretKey || !bucket) {
    throw new Error("Missing required MinIO environment variables");
}

export const minioClient = new Minio.Client({
    endPoint,
    port: parseInt(port),
    useSSL: false,
    accessKey,
    secretKey,
});

export async function initMinio() {
    const exists = await minioClient.bucketExists(minioConfig.bucket);

    if (!exists) {
        await minioClient.makeBucket(minioConfig.bucket, minioConfig.region);
    }
}
