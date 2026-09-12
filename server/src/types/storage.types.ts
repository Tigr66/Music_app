export type UploadFileData = {
    bucketName?: string;
    folder?: string;
    buffer: Buffer;
    contentType: string;
};

export type UploadFileFromPathData = {
    bucketName?: string;
    folder?: string;
    filePath: string;
    contentType: string;
};

export type DeleteFileData = {
    bucketName?: string;
    objectName: string;
};

export type GetFileUrlData = {
    bucketName?: string;
    objectName: string;
};
