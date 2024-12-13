import { InternalServerError } from "../../errors/TypeErrors.js";
import { User } from "../../models/User.model.js";


export const updateUserService = async(id, updateData) => {
    try {
        const allowedFields = [
          "nombre",
          "apellido",
          "correo",
          "telefono",
          "direccion",
        ];
        const dataToUpdate = {};

        allowedFields.forEach((field) => {
          if (updateData[field] !== undefined) {
            dataToUpdate[field] = updateData[field];
          }
        });

        const user = await User.findOneAndUpdate({ _id: id, activo: true }, dataToUpdate, { new: true }).select('-password -activo');
        return user;
    } catch (error) {
        throw new InternalServerError('Error al procesar el servicio de actualización de usuario', error)
    }
}

export async function updateUserImageService(id, imageUrl) {
    try {
        const user = await User.findOneAndUpdate({ _id: id, activo: true }, { imagen: imageUrl }, { new: true }).select("-password -activo");
        return user;
    } catch (error) {
        throw new InternalServerError("Error al procesar el servicio de actualización de usuario", error);
    }
}