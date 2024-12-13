import { InternalServerError } from "../../errors/TypeErrors.js";
import { Product } from "../../models/Product.model.js";

export async function updateProductImageService(id, imageUrl) {
    try {
        const product = await Product.findOneAndUpdate({ _id: id, activo: true }, { imagen: imageUrl }, { new: true }).select("-password -activo");
        return product;
    } catch (error) {
        throw new InternalServerError("Error al procesar el servicio de actualización de product", error);
    }
}