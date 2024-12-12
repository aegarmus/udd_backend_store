import multer from "multer";
import path from 'path';
import fs from 'fs'
import { generateFileName } from "../../utils/files/generateFileName.js";
import { FileServiceError } from "../../errors/TypeErrors.js";


export const uploadFile = (folder) => {
    try {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                const dir = path.resolve('public', 'uploads', folder);

                fs.mkdir(dir, { recursive: true }, (err) => err ? cb(err, '') : cb(null, dir));
            },
            filename: (req, file, cb) => {
                const filename = generateFileName(file.originalname);
                cb(null, filename);
            },
        });
    } catch (error) {
        throw new FileServiceError('Error al subir el archivo al servidor', error)
    }
}