import mongoose from "mongoose";

const { Schema, model } = mongoose;

const saleDetailsSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Debes tener al menos 1 producto']
    },
    subtotal: {
        type: Number,
        required: true,
        min: [0, 'El subtotal debe ser mayor a igual 0']
    }
}, { _id: false});

const saleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    details: {
        type: [saleDetailsSchema], 
        required: true
    },
    total: {
        type: Number,
        required: true,
        min: [0, `El total debe ser mayor o igual a 0`]
    }
}, { timestamps: true })


export const Sale = model('Sale', saleSchema)