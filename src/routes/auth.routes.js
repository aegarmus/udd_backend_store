import { Router } from 'express';
import {
  login,
  register,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { uploadPhotoMiddleware } from '../middlewares/uploadFile.middlewares.js';


const router = Router();

router.post('/', uploadPhotoMiddleware('usuarios', 'file') , register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


export default router