import { pool } from '../config/config.mjs';

export class obtenerTestimonios {
    async obtenerTestimonios() {
        const resultado = await pool.query(
            'SELECT * FROM testimonios ORDER BY id;'
        );
        return resultado.rows;
    }
    async crear(autor, contenido) {
        const query = `
            INSERT INTO testimonios
            (autor, contenido)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const resultado = await pool.query(query, [
            autor,
            contenido
        ]);
        return resultado.rows[0];
    }
    async actualizar(id, autor, contenido) {
        const query = `
            UPDATE testimonios
            SET
                autor = $1,
                contenido = $2
            WHERE id = $3
            RETURNING *;
        `;
        const resultado = await pool.query(query, [
            autor,
            contenido,
            id
        ]);
        return resultado.rows[0];
    }
    async eliminar(id) {
        const query = `
            DELETE FROM testimonios
            WHERE id = $1
            RETURNING *;
        `;
        const resultado = await pool.query(query, [id]);
        return resultado.rows[0];
    }
}
