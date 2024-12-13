import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getAllUsers, getUserById, updateUser, updateUserImage } from '../controllers/user.controller.js';
import { uploadPhotoMiddleware } from '../middlewares/uploadFile.middlewares.js';


const router = Router();

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.put('/:id/image', authMiddleware, uploadPhotoMiddleware('usuarios', 'file'), updateUserImage);


export default router;