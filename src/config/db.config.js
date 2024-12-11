import mongoose from "mongoose";
import dotenv from 'dotenv';
import { DataBaseError } from "../errors/TypeErrors.js";

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log(`Concectado a la base de datos de Mongo`)
    } catch (error) {
        throw new DataBaseError(`Error al establecer conección con la base de datos de Mongo`,  error)
    }
}