import { pool } from '../config/config.mjs';

export class obtenerSuscripciones {
    async obtenerSuscripciones() {
        const query = `
            SELECT
                s.id,
                s.idusuario,
                s.identrenamiento,
                u.correo AS nombreUsuario,
                e.nombre AS nombreEntrenamiento,
                s.fechapago,
                s.fechavencimiento,
                s.monto,
                s.estado::text AS estado
            FROM suscripciones s
            JOIN usuario u
                ON s.idusuario = u.id
            JOIN entrenamientos e
                ON s.identrenamiento = e.id
            ORDER BY s.id DESC;
        `;
        const resultado =
            await pool.query(query);
        return resultado.rows;
    }
    async crear(
        idusuario,
        identrenamiento,
        fechapago,
        fechavencimiento,
        monto,
        estado
    ) {
        const query = `
    INSERT INTO suscripciones
    (
        idusuario,
        identrenamiento,
        fechapago,
        fechavencimiento,
        monto,
        estado
    )
    VALUES
    (
        $1::bigint,
        $2::bigint,
        $3::date,
        $4::date,
        $5::numeric,
        $6::estadossuscripcion
    )
    RETURNING *, estado::text;
`;
        const resultado = await pool.query(query, [
    idusuario,
    identrenamiento,
    fechapago,
    fechavencimiento,
    monto,
    estado.trim().toLowerCase()
]);
        return resultado.rows[0];
    }
    async actualizar(
        id,
        idusuario,
        identrenamiento,
        fechapago,
        fechavencimiento,
        monto,
        estado
    ) {
        const query = `
    UPDATE suscripciones
    SET
        idusuario = $1::bigint,
        identrenamiento = $2::bigint,
        fechapago = $3::date,
        fechavencimiento = $4::date,
        monto = $5::numeric,
        estado = $6::estadossuscripcion
    WHERE id = $7::bigint
    RETURNING *, estado::text;
`;
const resultado = await pool.query(query, [
    idusuario,
    identrenamiento,
    fechapago,
    fechavencimiento,
    monto,
    estado.trim().toLowerCase(),
    id
]);
        return resultado.rows[0];
    }
    async eliminar(id) {
        const query = `
            DELETE FROM suscripciones
            WHERE id = $1
            RETURNING *;
        `;
        const resultado =
            await pool.query(query, [id]);
        return resultado.rows[0];
    }
}