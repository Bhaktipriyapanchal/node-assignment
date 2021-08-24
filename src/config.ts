import path from 'path';

export default {
    AWS_ID: 'AKIARAY6AUUIU547JDRC',
    AWS_SECRET: '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',
    AWS_BUCKET_NAME: 'node-assignment-bucket',
    UPLOAD_DIR: path.join(__dirname, '../uploads'),
    UPLOAD_LIMITS: {
        fileSize: 52428800, //in bytes. more about limits here - https://github.com/expressjs/multer
        fieldSize: 52428800
    },
}