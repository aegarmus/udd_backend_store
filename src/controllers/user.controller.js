import { ValidationError } from "../errors/TypeErrors.js";
import { User } from "../models/User.model.js"


export const getAllUsers = async(req, res, next) => {
    try {
        const users = await User.find({ activo: true }).select('-password -activo');

        res.status(200).json({
            message: 'Usuarios encontrados con éxito',
            status: 200,
            data: users
        })
    } catch (error) {
        next(error)
    }
}

export const getUserById = async(req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id, activo: true }).select('-password -activo');
        if(!user) throw new ValidationError('El usuario no éxiste');

        res.status(200).json({
          message: "Usuario encontrado con éxito",
          status: 200,
          data: user,
        });
    } catch (error) {
        next(error)
    }
}