import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  createSale,
  getAllSales,
  getSaleById,
} from "../controllers/sale.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createSale
);


router.get("/", authMiddleware, verifyAdmin, getAllSales);


router.get("/:id", authMiddleware, getSaleById);

export default router;
