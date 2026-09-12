const bucket = process.env.MINIO_BUCKET;

if (!bucket) {
    throw new Error("Missing MINIO_BUCKET environment variable");
}

export const minioConfig = {
    bucket,
    region: "us-east-1",
    presignedUrlExpiration: 60 * 60, // 1 hour
};
