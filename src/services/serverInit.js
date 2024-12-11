import { InternalServerError } from "../errors/TypeErrors.js";

export const serverInit = (app, port) => {
    try {
        app.listen(port, () => {
            console.log(`Servidor Corriendo en el puerto ${port}`);
        });
    } catch (error) {
        throw new InternalServerError(`Error al inicializar el Servidor en el puerto ${port}`, error);
    }
}