import { AuthError } from "../../../errors/TypeErrors.js";


export const buildResetUrl = (token) => {
    try {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        return resetUrl
    } catch (error) {
        throw new AuthError('Error al crear la url para resetea contraseña', error)
    }
}