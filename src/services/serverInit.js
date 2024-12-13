import { connectDB } from "../config/db.config.js";
import { verifyConnectionMail } from "../config/mail.config.js";
import { InternalServerError, MailServiceError } from "../errors/TypeErrors.js";

export const serverInit = async(app, port) => {
    try {
        console.log(`Verificando conexión con Mongo`);
        await connectDB()
        app.listen(port, async() => {
            try {
                await verifyConnectionMail();
            } catch (error) {
                throw new MailServiceError('Errro en la conexión', error)
            }
            console.log(`Servidor Corriendo en el puerto ${port}`);
        });
    } catch (error) {
        throw new InternalServerError(`Error al inicializar el Servidor en el puerto ${port}`, error);
    }
}