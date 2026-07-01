export function verificarAdministrador(req, res, next) {
    if (!req.usuario){
        return res.status(401).json({ mensaje: "Iniciar sesión." });
    }
    if (req.usuario.idrol !== 2){
        return res.status(403).json({ mensaje: "Acceso denegado. Se requiere rol de administrador." });
    }

    next();
}

//No lo voy a usar aún. Pero lo voy a dejar acá para ver en qué endpoints los aplico luego.
//Por ahora aplique los middlewares para verificar el token en todas las rutas que lo requieren.
//Nuevamente mildis por haber obviado este punto.