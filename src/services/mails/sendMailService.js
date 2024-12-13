import { transporter } from "../../config/mail.config.js"
import { MailServiceError } from "../../errors/TypeErrors.js";



export const sendMailService = async({ to, subject, message, html = '' }) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message,
            html
        }

        const infoData = await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito', infoData.messageId);
        return infoData;
    } catch (error) {
        throw new MailServiceError('Error al enviar el correo', error)
    }
}