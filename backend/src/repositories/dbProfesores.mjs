import { pool } from '../config/config.mjs';

export class obtenerProfesores {
    async obtenerProfesores() {
        try {
            const resultado = await pool.query(
                'SELECT * FROM profesores ORDER BY id;'
            );
            return resultado.rows;
        } catch (error) {
            console.error('Error al obtener profesores:', error);
            throw error;
        }
    }
    async crear(nombre, descripcion, imagen) {
        const query = `
            INSERT INTO profesores
            (nombre, descripcion, imagen)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const resultado = await pool.query(query, [
            nombre,
            descripcion,
            imagen
        ]);
        return resultado.rows[0];
    }
    async actualizar(id, nombre, descripcion, imagen) {
        const query = `
            UPDATE profesores
            SET
                nombre = $1,
                descripcion = $2,
                imagen = $3
            WHERE id = $4
            RETURNING *;
        `;
        const resultado = await pool.query(query, [
            nombre,
            descripcion,
            imagen,
            id
        ]);
        return resultado.rows[0];
    }
    async eliminar(id) {
        const query = `
            DELETE FROM profesores
            WHERE id = $1
            RETURNING *;
        `;
        const resultado = await pool.query(query, [id]);
        return resultado.rows[0];
    }
}
