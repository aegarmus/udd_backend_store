import mongoose from "mongoose";
import { REGEX_URI } from "../utils/constant/regex.js";

const { Schema, model } = mongoose;

const productSchema = new Schema({
    nombre: { 
        type: String, 
        required: true, 
        trim: true 
    },
    descripcion: { 
        type: String, 
        required: true, 
        trim: true 
    },
    precio: {
        type: Number,
        required: true,
        min: [0, 'El precio debe ser mayor o igual a 0']
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'El stock debe ser mayor o igual a 0']
    },
    imagen: {
        type: String, 
        trim: true,
        validate: {
            validator: (value) => REGEX_URI.test(value) || value === '',
            message: 'URL de la imagen no válida',    
        }
    }
}, { timestamps: true });

export const Product = model('Product', productSchema);