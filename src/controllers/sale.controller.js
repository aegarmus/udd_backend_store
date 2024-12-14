import { AuthError, DataBaseError } from "../errors/TypeErrors.js";
import {
  createSaleService,
  getAllSalesService,
  getSaleByIdService,
} from "../services/sale/saleService.js";

export const createSale = async (req, res, next) => {
    try {
        const { details } = req.body; 
        const userId = req.user.uid; 
        console.log(details)
        
        const sale = await createSaleService(userId, details);
        
        res.status(201).json({
            message: "Venta creada con éxito",
            status: 201,
            data: sale,
        });
    } catch (error) {
        console.error(error)
      next(error);
    }
};

export const getAllSales = async (req, res, next) => {
    try {
        const sales = await getAllSalesService();

        res.status(200).json({
            message: "Ventas encontradas con éxito",
            status: 200,
            data: sales,
        });
    } catch (error) {
        next(error);
    }
};

export const getSaleById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sale = await getSaleByIdService(id);
        
        if (!sale) {
            throw new DataBaseError('Venta no encontrada')
        }
      
        // Verificar si el usuario es el propietario o un administrador
        if (sale.user.toString() !== req.user.uid && !req.user.isAdmin) {
            throw new AuthError('Permiso denegado')
        }
      
        res.status(200).json({
            message: "Venta encontrada con éxito",
            status: 200,
            data: sale,
        });
    } catch (error) {
        next(error);
    }
};
