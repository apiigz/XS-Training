import jwt from "jsonwebtoken"; // => La volvemos a exportar. Dicho sea de paso, hay que borrar todo lo referido a nanoid.

export function comprobarToken(req, res, next){
    console.log("Cookies:", req.cookies);
    console.log("Signed:", req.signedCookies);
    const token = req.signedCookies.token;

    if (!token){
        return res.status(401).json({ mensaje: "No se proporcionó un token de autenticación." });
    }

    jwt.verify(token, process.env.FIRMA_JWT, (error, payload) =>{
        if (error){
            return res.status(403).json({ mensaje: "Token inválido o expirado." });
        }
        req.usuario = payload;

        next();
    })
}