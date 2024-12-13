import { AuthError } from "../../errors/TypeErrors.js";
import { User } from "../../models/User.model.js";
import { hashPassword } from "../../utils/auth/hashPassword.js"

export const registerUser = async({nombre, apellido, correo, telefono, password, direccion, imagen}) => {
    try {
        console.log(password)
        const hashedPassword = await hashPassword(password);

        console.log(hashPassword)

        const user = await User.create({
            nombre,
            apellido,
            correo,
            telefono,
            password: hashedPassword, 
            direccion,
            imagen
        });

        return user
    } catch (error) {
        throw new AuthError('No pudimos registrar los datos del Usuario', error)
    }
} 