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