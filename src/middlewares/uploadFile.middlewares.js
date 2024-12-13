import multer from "multer"
import { uploadFile } from "../services/files/multerConfig.js"
import { FileServiceError } from "../errors/TypeErrors.js";

export const uploadPhotoMiddleware = (folder, fieldname) => {
    try {
        const upload = multer({ storage: uploadFile(folder) });
        return upload.single(fieldname);
    } catch (error) {
        throw new FileServiceError(`Error al subir la foto enviada`, error)
    }
}

export const uploadMultipleFilesMiddleware = (folder, fields, maxCount = 5) => {
    try {
        const upload = multer({ storage: uploadFile(folder) });
        return upload.array(fields, maxCount);
    } catch (error) {
        throw new FileServiceError(`Error al subir los multiples archivos`, error)
    }
}