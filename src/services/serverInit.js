import { connectDB } from "../config/db.config.js";
import { InternalServerError } from "../errors/TypeErrors.js";

export const serverInit = async(app, port) => {
    try {
        console.log(`Verificando conexión con Mongo`);
        await connectDB()
        app.listen(port, () => {
            console.log(`Servidor Corriendo en el puerto ${port}`);
        });
    } catch (error) {
        throw new InternalServerError(`Error al inicializar el Servidor en el puerto ${port}`, error);
    }
}