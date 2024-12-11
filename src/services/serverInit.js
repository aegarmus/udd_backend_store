
export const serverInit = (app, port) => {
    try {
        app.listen(port, () => {
            console.log(`Servidor Corriendo en el puerto ${port}`);
        });
    } catch (error) {
        console.error(`Error al iniciar el servidor. ERROR: ${error}`);
    }
}