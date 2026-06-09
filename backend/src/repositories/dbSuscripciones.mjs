import {pool} from '../config/db.mjs';

export class obtenerSuscripciones{
    async obtenerSuscripciones(req, res){
        try {
            const resultado = await pool.query('SELECT s.id, u.correo AS nombreUsuario, e.nombre AS nombreEntrenamiento, s.fechaPago, s.fechaVencimiento, s.monto, s.estado FROM suscripciones s JOIN usuario u ON s.idUsuario = u.id JOIN entrenamientos e ON s.idEntrenamiento = e.id');
            return resultado.rows;
        } catch (error) {
            console.error('Error al obtener las suscripciones:', error);
            throw error;   
        }
    }

    async crear(idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado) {
        const query = `
            INSERT INTO suscripciones (idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const resultado = await pool.query(query, [idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado]);
        return resultado.rows[0];
    }

    async actualizar(id, idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado) {
        const query = `
            UPDATE suscripciones
            SET idusuario = $1, identrenamiento = $2, fechapago = $3, fechavencimiento = $4, monto = $5, estado = $6
            WHERE id = $7
            RETURNING *;
        `;
        const resultado = await pool.query(query, [idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado, id]);
        return resultado.rows[0];
    }

    async eliminar(id) {
        const query = 'DELETE FROM suscripciones WHERE id = $1 RETURNING *;';
        const resultado = await pool.query(query, [id]);
        return resultado.rows[0];
    }
}