import crypto from 'crypto';
import dotenv from 'dotenv';
import { User } from '../../../models/User.model.js';
import { AuthError, NotFoundError } from '../../../errors/TypeErrors.js';
import { buildResetUrl } from './buildResetURL.js';
import { sendMailService } from '../../mails/sendMailService.js';


dotenv.config();

export const forgotPasswordService = async(correo) => {
    try {

            const user = await User.findOne({ correo, activo: true });
            
            if(!user) throw new NotFoundError(`No se encontro un usuario con el correo ${correo}`);
            
            const token = crypto.randomBytes(20).toString('hex');
            
            const expires = Date.now() + 300000 //5 minutos
            user.resetPasswordToken = token
            user.resetPasswordExprires = expires
            await user.save();
            
            const resetUrl = buildResetUrl(token);

            await sendMailService({
                to: user.correo,
                subject: 'Recuperar Contraseña',
                message: 'Visita el siguiente enlace para restablecer tu contraseña. Dispondras de 5 minutos antes que caduque',
                html: `<p>Haz click en el siguiente enlace para restablecer tu contraseña</p>
                        <a href="${resetUrl}">Restablecer Contraseña Aquí</a>`
            });

            const message = 'Email de restablecimiento enviado';
            return message
    } catch (error) {
        console.error(error)
        throw new AuthError('Error al enviar el correo de restablecimiento de contraseña',  error)
    }
}