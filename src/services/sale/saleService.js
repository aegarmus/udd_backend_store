// src/services/sale/sale.service.js
import mongoose from "mongoose";
import { Sale } from "../../models/Sale.model.js";
import { Product } from "../../models/Product.model.js";
import { InternalServerError, NotFoundError, ValidationError } from "../../errors/TypeErrors.js";

export const createSaleService = async(userId, details) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let total = 0;
        const saleDetails = [];
        
        for (const item of details) {
            const { productId, quantity } = item;
            
            const product = await Product
                                .findOne({_id: productId,})
                                .session(session);
            if (!product) {
                throw new NotFoundError(
                  `Producto con ID ${productId} no encontrado o inactivo`
                );
            }
          
            if (product.stock < quantity) {
                throw new ValidationError(
                  `Stock insuficiente para el producto ${product.nombre}`
                );
            }
          
            const subtotal = product.precio * quantity;
            total += subtotal;
          
            saleDetails.push({
                productId: product._id,
                quantity,
                subtotal,
            });
          
            product.stock -= quantity;
            await product.save({ session });
        }
  
        const sale = await Sale.create(
            [
              {
                    user: userId,
                    details: saleDetails,
                    total,
              },
            ],
            { session }
        );
  
        await session.commitTransaction();
        session.endSession();
        
        return sale[0];
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new InternalServerError('Error al crear la venta', error);
    }
}

export const getAllSalesService = async() => {
    try {
        const sales = await Sale.find()
            .populate("user", "nombre apellido correo")
            .populate("details.productId", "nombre precio")
            .sort({ createdAt: -1 });
        return sales;    
    } catch (error) {
        throw new InternalServerError('Eerror al selecionar las ventas', error)
    }
}

export async function getSaleByIdService(id) {
    try {
        const sale = await Sale.findById(id)
            .populate("user", "nombre apellido correo")
            .populate("details.productId", "nombre precio");
        return sale;
    } catch (error) {
        throw new InternalServerError('Error al obtener una venta por id', error)
    }
}
