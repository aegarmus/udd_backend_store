import { AuthError } from "../../../errors/TypeErrors.js";
import { User } from "../../../models/User.model.js"
import { hashPassword } from "../../../utils/auth/hashPassword.js";


export const resetPasswordService = async(token, newPassword) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExprires: { $gt: Date.now() }
        });

        if(!user) throw new AuthError('Token inválido o expirado');

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;

        user.resetPasswordToken = null;
        user.resetPasswordExprires = null;

        await user.save()

        return { message: 'Contraseña actualizada con éxito' }
    } catch (error) {
        throw new AuthError('Error al restablecer la contraseña', error);
    }
}