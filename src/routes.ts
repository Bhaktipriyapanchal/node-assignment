import express from 'express';
import movieApi from './api/movie';
import configApi from './api/config';
import { upload } from './services/multer';

const { Router } = express;
const router = Router();

router.get('/movies', movieApi.list);
router.post('/movie', movieApi.create);
router.get('/movie/:id', movieApi.get);
router.put('/movie/:id', movieApi.update);
router.delete('/movie/:id', movieApi.delete);
router.post('/movies', movieApi.createMany);
router.post('/upload', upload.single('image'), movieApi.upload);

router.get('/config', configApi.get);
router.post('/config', configApi.create);

export default router;
