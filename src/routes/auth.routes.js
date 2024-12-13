import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { uploadPhotoMiddleware } from '../middlewares/uploadFile.middlewares.js';

const router = Router();

router.post('/auth', uploadPhotoMiddleware('usuarios', 'file') , register);
router.post('/login', login)


export default router