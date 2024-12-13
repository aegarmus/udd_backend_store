import { Product } from "../models/Product.model.js";
import { buildFileUrl } from "../utils/files/buildFileUrl.js";

export const createProduct = async(req, res, next) => {
    try {
        let imageUrl = ''
        if(req.file) imageUrl = buildFileUrl(req, req.file.filename, 'productos') || '';

        const productData = { ...req.body, imagen: imageUrl };
        const product = await Product.create(productData);

        res.status(201).json({
            message: 'Producto creado con éxito',
            status: 201,
            data: product
        })

    } catch (error) {
        next(error)
    }
}