import { registerUser } from "../services/auth/register.service.js"
import { buildFileUrl } from "../utils/files/buildFileUrl.js";
import { formatUserData } from "../utils/format/formatUser.js";

export const register = async(req, res, next) => {
    try {
        let imageUrl = ''
        if(req.file) imageUrl = buildFileUrl(req, req.file.filename, 'usuarios');

        const userData = formatUserData(req.body, imageUrl)

        const user = await registerUser(userData);
        res.status(201).json({
            message: "Usuario Creado con éxito",
            status: 201,
            user: {
                email: user.correo,
                id: user.id
            }
        });
    } catch (error) {
        next(error);
    }
}