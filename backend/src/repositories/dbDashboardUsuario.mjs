import { pool } from "../config/config.mjs";

export class obtenerDashboardUsuario {
    async obtenerMiSuscripcion(idUsuario) {
        const query = `
            SELECT
                s.id,
                s.estado::text AS estado,
                s.fechapago,
                s.fechavencimiento,
                s.monto,
                e.nombre AS entrenamiento
            FROM suscripciones s
            INNER JOIN entrenamientos e
                ON s.identrenamiento = e.id
            WHERE s.idusuario = $1
            ORDER BY s.fechavencimiento DESC
            LIMIT 1;
        `;
        const resultado = await pool.query(query, [idUsuario]);
        return resultado.rows[0];
    }
    async obtenerMisReservas(idUsuario) {
        const query = `
            SELECT
                r.id,
                r.estado::text AS estado,
                cp.id AS idclase,
                cp.cupomaximo,
                TO_CHAR(cp.fechahora,'DD/MM/YYYY') AS fecha,
                TO_CHAR(cp.fechahora,'HH24:MI') AS hora,
                e.nombre AS entrenamiento,
                p.nombre AS profesor
            FROM reservas r
            INNER JOIN clasesprogramadas cp
                ON cp.id = r.idclaseprogramada
            INNER JOIN entrenamientos e
                ON e.id = cp.identrenamiento
            INNER JOIN profesores p
                ON p.id = cp.idprofesor
            WHERE r.idusuario = $1
            ORDER BY cp.fechahora;
        `;
        const resultado = await pool.query(query, [idUsuario]);
        return resultado.rows;
    }
    async obtenerClasesDisponibles() {
        const query = `
            SELECT
                cp.id,
                cp.cupomaximo,
                TO_CHAR(cp.fechahora,'DD/MM/YYYY') AS fecha,
                TO_CHAR(cp.fechahora,'HH24:MI') AS hora,
                e.nombre AS entrenamiento,
                p.nombre AS profesor,
                COUNT(r.id) FILTER
                (
                    WHERE r.estado <> 'cancelada'
                ) AS ocupados
            FROM clasesprogramadas cp
            INNER JOIN entrenamientos e
                ON e.id = cp.identrenamiento
            INNER JOIN profesores p
                ON p.id = cp.idprofesor
            LEFT JOIN reservas r
                ON r.idclaseprogramada = cp.id
            GROUP BY
                cp.id,
                cp.cupomaximo,
                cp.fechahora,
                e.nombre,
                p.nombre
            ORDER BY cp.fechahora;
        `;
        const resultado = await pool.query(query);
        return resultado.rows;
    }
    async reservarClase(idUsuario, idClase) {
        // ¿Existe la reserva?
        const existe = await pool.query(
            `
            SELECT id
            FROM reservas
            WHERE
                idusuario = $1
            AND
                idclaseprogramada = $2
            AND
                estado <> 'cancelada';
            `,
            [
                idUsuario,
                idClase
            ]
        );
        if (existe.rowCount > 0) {
            throw new Error(
                "Ya tenés una reserva para esa clase."
            );
        }
        // Cupo máximo
        const cupo = await pool.query(
            `
            SELECT
                cp.cupomaximo,
                COUNT(r.id)
                FILTER
                (
                    WHERE r.estado <> 'cancelada'
                ) ocupados
            FROM clasesprogramadas cp
            LEFT JOIN reservas r
                ON r.idclaseprogramada = cp.id
            WHERE cp.id = $1
            GROUP BY
                cp.id,
                cp.cupomaximo;
            `,
            [
                idClase
            ]
        );
        if (cupo.rowCount === 0) {
            throw new Error(
                "La clase no existe."
            );
        }
        const clase = cupo.rows[0];
        if (
            Number(clase.ocupados)
            >=
            clase.cupomaximo
        ) {
            throw new Error(
                "No quedan lugares disponibles."
            );
        }
        // Registrar reserva
        const resultado = await pool.query(
            `
            INSERT INTO reservas
            (
                idusuario,
                idclaseprogramada,
                estado,
                fechareserva
            )
            VALUES
            (
                $1,
                $2,
                'confirmada',
                NOW()
            )
            RETURNING *;
            `,
            [
                idUsuario,
                idClase
            ]
        );
        return resultado.rows[0];
    }
}