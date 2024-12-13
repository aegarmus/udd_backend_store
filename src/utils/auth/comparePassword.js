import bcrypt from 'bcrypt'

import { AuthError } from "../../errors/TypeErrors.js";

export const comparePassword = async(plainPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        throw new AuthError(`No se pudo verificar la contraseña`, error)
    }
}