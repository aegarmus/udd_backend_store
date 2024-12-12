import bcrypt from 'bcrypt'
import { AuthError } from '../../errors/TypeErrors.js'

export const hashPassword = async(password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword
    } catch (error) {
        throw new AuthError(`Error al encriptar la contraseña`, error)
    }
}