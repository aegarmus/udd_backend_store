import { FormatError } from "../../errors/TypeErrors";

export const formatUserData = (data, image) => {
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
          image
        };
   
        
    } catch (error) {
        throw new FormatError(`Error al formatear al usuario`, error)
    }
}