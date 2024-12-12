import { registerUser } from "../services/auth/register.service.js"

export const register = async(req, res, next) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({
            message: "Usuario Creado con éxito",
            status: 201,
            user: {
                email: user.correo,
                id: user.id
            }
        });
    } catch (error) {
        next(error);
    }
}