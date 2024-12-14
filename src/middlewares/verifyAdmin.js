export const verifyAdmin = (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res
        .status(403)
        .json({ error: "Acceso denegado: requiere permisos de administrador" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
