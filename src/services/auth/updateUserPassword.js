import { AuthError, NotFoundError } from "../../errors/TypeErrors.js";
import { User } from "../../models/User.model.js"
import { comparePassword } from "../../utils/auth/comparePassword.js";
import { hashPassword } from "../../utils/auth/hashPassword.js";


export const updateUserPasswordService = async(id, oldPassword, newPassword) => {
    try {
        const user = await User.findOne({ _id: id, activo: true });
        if (!user) throw new NotFoundError('Usuario no encontrado con este ID');

        const matchPassword = await comparePassword(oldPassword, user.password);

        if(!matchPassword) throw new AuthError(`La contraseña actual no es correcta`);

        const hashedNewPassword = await hashPassword(newPassword);

        user.password = hashedNewPassword;
        await user.save();

        return user
    } catch (error) {
        throw new AuthError('Fallo en el cambio de contraseña', error)
    }
}