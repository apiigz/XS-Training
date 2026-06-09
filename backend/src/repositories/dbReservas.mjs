import {pool} from '../config/db.mjs';

export class obtenerReservas{
    async obtenerReservas(req, res){
        try {
            const query = `
                SELECT 
                    r.id, r.idusuario, r.idclaseprogramada, r.estado::text, r.fechareserva,
                    u.correo as usuario_email, 
                    cp.fechahora as clase_fechahora,
                    e.nombre as entrenamiento_nombre
                FROM reservas r
                LEFT JOIN usuario u ON r.idusuario = u.id
                LEFT JOIN clasesprogramadas cp ON r.idclaseprogramada = cp.id
                LEFT JOIN entrenamientos e ON cp.identrenamiento = e.id
                ORDER BY r.id DESC;
            `;
            const resultado = await pool.query(query);

            return resultado.rows.map(res => {
                const fechaObj = new Date(res.clase_fechahora);
                return {
                    ...res,
                    clase_dia: res.clase_fechahora ? fechaObj.toLocaleDateString('es-ES', { weekday: 'long' }).replace(/^\w/, c => c.toUpperCase()) : 'Sin día',
                    clase_hora: res.clase_fechahora ? fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }) : '00:00',
                    clase_fecha_corta: res.clase_fechahora ? fechaObj.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }) : ''
                };
            });
        } catch (error) {
            console.error('Error al obtener las reservas:', error);
            throw error;
        }
    }

    async crear(idusuario, idclaseprogramada, estado) {
        try {
            const query = `
                INSERT INTO reservas (idusuario, idclaseprogramada, estado, fechareserva)
                VALUES ($1::bigint, $2::bigint, $3::estadoreserva, NOW()) 
                RETURNING *, estado::text;
            `;
            const resultado = await pool.query(query, [idusuario, idclaseprogramada, estado.trim().toLowerCase()]);
            return resultado.rows[0];
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            throw error;
        }
    }

    async actualizar(id, estado) {
        try {
            const query = `
                UPDATE reservas
                SET estado = $1::estadoreserva
                WHERE id = $2::bigint
                RETURNING *, estado::text;
            `;
            const resultado = await pool.query(query, [estado.trim().toLowerCase(), id]);
            return resultado.rows[0];
        } catch (error) {
            console.error('Error al actualizar la reserva:', error);
            throw error;
        }
    }

    async eliminar(id) {
        try {
            const query = 'DELETE FROM reservas WHERE id = $1::bigint RETURNING *;';
            const resultado = await pool.query(query, [id]);
            return resultado.rows[0];
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
            throw error;
        }
    }
}