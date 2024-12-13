import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { MailServiceError } from '../errors/TypeErrors.js';

dotenv.config();

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})


export const verifyConnectionMail = async() => {
    try {
        await transporter.verify();
        console.log('Conexión éxitosa con el servidor de correo');
    } catch (error) {
        throw new MailServiceError('Error al conectar con el Servidor de correo', error)
    }
}