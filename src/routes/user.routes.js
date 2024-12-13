import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getAllUsers, getUserById } from '../controllers/user.controller.js';


const router = Router();

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);


export default router;