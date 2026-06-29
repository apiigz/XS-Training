import { pool } from '../config/config.mjs';

export class UsuarioRepository {
    async obtenerUsuarios() {
        try {
            const query = `
                SELECT id, correo, idrol, session_id
                FROM usuario
                ORDER BY id;
            `;
            const resultado = await pool.query(query);
            return resultado.rows;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }
    async buscarPorCorreo(correo) {
        try {
            const query = `
                SELECT *
                FROM usuario
                WHERE correo = $1;
            `;
            const resultado = await pool.query(query, [correo]);
            return resultado.rows[0];
        } catch (error) {
            console.error('Error al buscar usuario:', error);
            throw error;
        }
    }
    async buscarPorSesion(sessionId) {
        try {
            const query = `
                SELECT id, correo, idrol
                FROM usuario
                WHERE session_id = $1;
            `;
            const resultado = await pool.query(query, [sessionId]);
            return resultado.rows[0];
        } catch (error) {
            console.error('Error al buscar sesión:', error);
            throw error;
        }
    }
    async crear(correo, passwordHash) {
        try {
            const query = `
                INSERT INTO usuario (correo, password_hash, idrol)
                VALUES ($1, $2, 2)
                RETURNING id, correo, idrol;
            `;
            const resultado = await pool.query(query, [correo, passwordHash]);
            return resultado.rows[0];
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }
    async actualizarSesion(idUsuario, sessionId) {
        try {
            const query = `
                UPDATE usuario
                SET session_id = $1
                WHERE id = $2;
            `;
            await pool.query(query, [sessionId, idUsuario]);
        } catch (error) {
            console.error('Error al actualizar sesión:', error);
            throw error;
        }
    }
    async eliminarSesion(idUsuario) {
        try {
            const query = `
                UPDATE usuario
                SET session_id = NULL
                WHERE id = $1;
            `;
            await pool.query(query, [idUsuario]);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            throw error;
        }
    }
}