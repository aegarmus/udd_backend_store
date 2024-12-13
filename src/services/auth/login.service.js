import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

import { User } from "../../models/User.model.js";
import { AuthError } from "../../errors/TypeErrors.js";
import { comparePassword } from "../../utils/auth/comparePassword.js";

dotenv.config()

export const loginService = async(correo, password) => {
    try {
        const user = await User.findOne({ correo });
        const passwordMatch = await comparePassword(password, user.password);

        if(!passwordMatch, !user) throw new AuthError(`Credencial inválida`);

        const token = jwt.sign({ uid: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        
        return { user, token };
    } catch (error) {
        throw new AuthError(`Login no autorizado`, error)
    }
}