import { loginService } from "../services/auth/login.service.js";
import { registerUser } from "../services/auth/register.service.js"
import { buildFileUrl } from "../utils/files/buildFileUrl.js";
import { formatUserData } from "../utils/format/formatUser.js";

export const register = async(req, res, next) => {
    try {
        console.log(req.body)
        let imageUrl = ''
        if(req.file) imageUrl = buildFileUrl(req, req.file.filename, 'usuarios');
        console.log(imageUrl)

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
        console.error('Error Interno en register', error)
        next(error);
    }
}


export const login = async(req, res, next) => {
    try {
        const { correo, password } = req.body;
        const { user, token } = await loginService(correo, password);

        res.status(202).json({
            message: "Usuario Logueado con éxito",
            status: 202,
            user: {
                id: user._id,
                email: user.correo,
                image: user.imagen,
                name: user.nombre,
                apellido: user.apellido
            },
            token
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}