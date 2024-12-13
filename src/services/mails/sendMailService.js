import { transporter } from "../../config/mail.config.js"
import { MailServiceError } from "../../errors/TypeErrors";



export const sendMailService = async({ to, subject, message }) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to.join(', '),
            subject,
            text: message
        }

        const infoData = await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito', infoData.messageId);
        return infoData;
    } catch (error) {
        throw new MailServiceError('Error al enviar el correo', error)
    }
}