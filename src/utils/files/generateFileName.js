import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { FileServiceError } from '../../errors/TypeErrors.js';

export const generateFileName = (originalFileName) => {
    try {
        const extension = path.extname(originalFileName);
        const idName = uuidv4().split('-')[0];

        return `${idName}${extension}`;
    } catch (error) {
        throw new FileServiceError(`Error al generar el nombre del archivo`, error)
    }
}

