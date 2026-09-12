export type UploadFileData = {
    bucketName?: string;
    folder?: string;
    buffer: Buffer;
    contentType: string;
};
