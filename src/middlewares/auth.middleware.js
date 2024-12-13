import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { AuthError } from "../errors/TypeErrors.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization || '';
        const token = authorization.startsWith('Bearer ') ?
                        authorization.slice(7)
                        : null;

        if(!token) throw new AuthError(`Token no proporcionado`, error);

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error)
        throw new AuthError('Token inválido o inesperado', error)
    }

}