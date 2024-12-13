import { Router } from "express";
import { createProduct, getAllProduct, getProductById, updateProduct } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadPhotoMiddleware } from "../middlewares/uploadFile.middlewares.js";


const router = Router()

router.post('/', authMiddleware, uploadPhotoMiddleware('productos', 'file') , createProduct);
router.get('/', getAllProduct);
router.get('/:id', getProductById);
router.put('/:id', authMiddleware, updateProduct);


export default router;