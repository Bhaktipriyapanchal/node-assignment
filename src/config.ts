import path from 'path';

export default {   
    UPLOAD_DIR: path.join(__dirname, '../uploads'),
    UPLOAD_LIMITS: {
        fileSize: 52428800, //in bytes. more about limits here - https://github.com/expressjs/multer
        fieldSize: 52428800
    },
}