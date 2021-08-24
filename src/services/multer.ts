import multer from 'multer';
import config from '../config';

const storage = multer.diskStorage({
    destination: function(req: any, file: any, cb: any) {
        cb(null, config.UPLOAD_DIR);``
    },
    filename: function(req: any, file: any, cb: any) {
      let ext = file.originalname.split('.');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  
      if (ext.length >= 2) {
        ext = ext[ext.length - 1];
      }
      return cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    }
});

export const upload = multer({
    storage: storage,
    limits: config.UPLOAD_LIMITS || {}
});