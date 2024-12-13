import { FormatError } from "../../errors/TypeErrors.js";

export const formatUserData = (data, imagen) => {
    try {
        const {
          nombre,
          apellido,
          correo,
          telefono,
          password,
          calle,
          comuna,
          numero,
          departamento,
          ciudad,
          region,
        } = data;
   
        const direccion = {
          calle,
          comuna,
          numero,
          departamento,
          ciudad,
          region,
        };
   
        return {
          nombre,
          apellido,
          correo,
          telefono,
          password,
          direccion,
          imagen
        };
   
        
    } catch (error) {
        throw new FormatError(`Error al formatear al usuario`, error)
    }
}