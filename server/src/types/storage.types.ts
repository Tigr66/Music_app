export type UploadFileData = {
    bucketName?: string;
    folder?: string;
    buffer: Buffer;
    contentType: string;
};

export type DeleteFileData = {
    bucketName?: string;
    objectName: string;
};
