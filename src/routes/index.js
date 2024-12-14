import { Router } from 'express';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import productRouter from './product.routes.js';
import saleRoutes from "./sale.routes.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/product', productRouter);
router.use("/sales", saleRoutes);

export default router;