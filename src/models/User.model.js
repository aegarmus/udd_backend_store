import mongoose from "mongoose";

const { Schema, model } = mongoose;

const addressSchema = new Schema(
  {
    calle: { type: String, required: true, trim: true },
    comuna: { type: String, required: true, trim: true },
    numero: { type: String, required: true, trim: true },
    departamento: { type: String, trim: true },
    ciudad: { type: String, required: true, trim: true },
    region: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Correo no válido"],
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(v) {
          return v.length >= 9;
        },
        message: "Número de teléfono no válido",
      },
    },
    password: { type: String, required: true },
    activo: { type: Boolean, default: true },
    direccion: { type: addressSchema, required: true },
    imagen: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(v) || v === "";
        },
        message: "URL de imagen no válida",
      },
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
