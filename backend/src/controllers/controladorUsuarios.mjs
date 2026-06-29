import { UsuarioRepository } from '../repositories/dbUsuarios.mjs';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

const repo = new UsuarioRepository();

export class controladorUsuarios {
    async getUsuarios(req, res) {
        try {
            const usuarios = await repo.obtenerUsuarios();
            return res.json(usuarios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                mensaje: 'Error al obtener los usuarios.'
            });
        }
    }
    async registrarUsuario(req, res) {
        try {
            const { correo, password } = req.body;
            if (!correo || !password) {
                return res.status(400).json({
                    mensaje: 'Debe completar todos los campos.'
                });
            }
            const usuarioExistente = await repo.buscarPorCorreo(correo);
            if (usuarioExistente) {
                return res.status(409).json({
                    mensaje: 'Ese correo ya está registrado.'
                });
            }
            const hash = await bcrypt.hash(password, 10);
            const usuario = await repo.crear(correo, hash);
            return res.status(201).json({
                mensaje: 'Usuario registrado correctamente.',
                usuario
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                mensaje: 'Error interno del servidor.'
            });
        }
    }
    async login(req, res) {
        try {
            const { correo, password } = req.body;
            if (!correo || !password) {
                return res.status(400).json({
                    mensaje: 'Debe completar todos los campos.'
                });
            }
            const usuario = await repo.buscarPorCorreo(correo);
            if (!usuario) {
                return res.status(401).json({
                    mensaje: 'Correo o contraseña incorrectos.'
                });
            }
            const coincide = await bcrypt.compare(
                password,
                usuario.password_hash
            );
            if (!coincide) {
                return res.status(401).json({
                    mensaje: 'Correo o contraseña incorrectos.'
                });
            }
            const sessionId = nanoid();
            await repo.actualizarSesion(
                usuario.id,
                sessionId
            );
            res.cookie('session_id', sessionId, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24
            });
            return res.json({
                mensaje: 'Inicio de sesión exitoso.',
                usuario: {
                    id: usuario.id,
                    correo: usuario.correo,
                    idrol: usuario.idrol
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                mensaje: 'Error interno del servidor.'
            });
        }
    }
    async logout(req, res) {
        try {
            const sessionId = req.cookies.session_id;
            if (!sessionId) {
                return res.sendStatus(204);
            }
            const usuario = await repo.buscarPorSesion(sessionId);
            if (usuario) {
                await repo.eliminarSesion(usuario.id);
            }
            res.clearCookie('session_id');
            return res.json({
                mensaje: 'Sesión cerrada correctamente.'
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                mensaje: 'Error interno del servidor.'
            });
        }
    }
    async verificarSesion(req, res) {
    try {
        const sessionId = req.cookies.session_id;
        if (!sessionId) {
            return res.status(401).json({
                logueado: false,
                mensaje: 'No hay sesión iniciada.'
            });
        }
        const usuario = await repo.buscarPorSesion(sessionId);
        if (!usuario) {
            return res.status(401).json({
                logueado: false,
                mensaje: 'Sesión inválida.'
            });
        }
        return res.json({
            logueado: true,
            usuario: {
                id: usuario.id,
                correo: usuario.correo,
                idrol: usuario.idrol
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: 'Error interno del servidor.'
        });
    }
}
}
export async function verificarCookies(req, res, next) {
    const sessionId = req.cookies.session_id;
    if (!sessionId) {
        return res.redirect("/login");
    }
    const usuario = await repo.buscarPorSesion(sessionId);
    if (!usuario) {
        res.clearCookie("session_id");
        return res.redirect("/login");
    }
    req.usuario = usuario;
    next();
}