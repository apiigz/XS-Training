import {pool} from '../config/db.mjs';

export class obtenerProfesores{
    async obtenerProfesores(req, res){
        try {
            const resultado = await pool.query('SELECT * FROM profesores');
            return resultado.rows;
        } catch (error) {
            console.error('Error al obtener profesores:', error);
            throw error;
        }
    }

    async crear(idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado) {
        const query = `
            INSERT INTO suscripciones (idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado)
            VALUES (
                $1::bigint, 
                $2::bigint, 
                $3::date, 
                $4::date, 
                $5::numeric, 
                $6::estadosuscripcion 
            )
            RETURNING *, estado::text;
        `;
        
        const estadoFormateado = estado.trim().toLowerCase(); 

        const resultado = await pool.query(query, [idusuario, identrenamiento, fechapago, fechavencimiento, monto, estadoFormateado]);
        return resultado.rows[0];
    }

    async actualizar(id, idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado) {
        const query = `
            UPDATE suscripciones
            SET 
                idusuario = $1::bigint, 
                identrenamiento = $2::bigint, 
                fechapago = $3::date, 
                fechavencimiento = $4::date, 
                monto = $5::numeric, 
                estado = $6::estadosuscripcion 
            WHERE id = $7::bigint
            RETURNING *, estado::text;
        `;

        const estadoFormateado = estado.trim().toLowerCase();

        const resultado = await pool.query(query, [idusuario, identrenamiento, fechapago, fechavencimiento, monto, estadoFormateado, id]);
        return resultado.rows[0];
    }

    async eliminar(id) {
        const query = 'DELETE FROM suscripciones WHERE id = $1::bigint RETURNING *;';
        const resultado = await pool.query(query, [id]);
        return resultado.rows[0];
    }
}

//Falta el resto de métodos para profesores (crear, actualizar, eliminar)