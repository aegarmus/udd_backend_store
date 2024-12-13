import { Router } from "express";
import { createProduct, getAllProduct, getProductById } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadPhotoMiddleware } from "../middlewares/uploadFile.middlewares.js";


const router = Router()

router.post('/', authMiddleware, uploadPhotoMiddleware('productos', 'file') , createProduct);
router.get('/', getAllProduct);
router.get('/:id', getProductById);


export default router;