import { NotFoundError } from "../errors/TypeErrors.js";
import { loginService } from "../services/auth/login.js";
import { registerUser } from "../services/auth/register.js"
import { forgotPasswordService } from "../services/auth/resetPassword/forgotPassword.js";
import { resetPasswordService } from "../services/auth/resetPassword/resetPasssword.js";
import { updateUserPasswordService } from "../services/auth/updateUserPassword.js";
import { buildFileUrl } from "../utils/files/buildFileUrl.js";
import { formatUserData } from "../utils/format/formatUser.js";

export const register = async(req, res, next) => {
    try {
        console.log(req.body)
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

export const updateUserPassword = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        if(req.user.uid !== id) throw new AuthError('No cuentas con autización para cambiar esta contraseña')

        const user = await updateUserPasswordService(id, oldPassword, newPassword);
        if(!user) throw new NotFoundError('No se encontró el usuario')

        res.status(200).json({
            message: "Contraseña Actualizada con éxito",
            status: 200
        })
    }catch(error){
        next(error)
    }
}


export const forgotPassword = async(req, res, next) => {
    try {
        const { correo } = req.body;
        const result = await forgotPasswordService(correo);
        
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}


export const resetPassword = async(req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        const result = await resetPasswordService(token, newPassword);

        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}