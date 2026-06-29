import { pool } from '../config/config.mjs';

export class obtenerClasesProgramadas {
    async obtenerClasesProgramadas() {
        const query = `
            SELECT
                cp.id,
                cp.identrenamiento,
                cp.idprofesor,
                cp.cupomaximo AS cupo,
                CASE EXTRACT(ISODOW FROM cp.fechahora)
                    WHEN 1 THEN 'Lunes'
                    WHEN 2 THEN 'Martes'
                    WHEN 3 THEN 'Miércoles'
                    WHEN 4 THEN 'Jueves'
                    WHEN 5 THEN 'Viernes'
                    WHEN 6 THEN 'Sábado'
                    WHEN 7 THEN 'Domingo'
                END AS dia,
                TO_CHAR(cp.fechahora, 'HH24:MI') AS hora_inicio,
                TO_CHAR(cp.fechahora, 'YYYY-MM-DD') AS fecha_base,
                e.nombre AS entrenamiento_nombre,
                p.nombre AS profesor_nombre
            FROM clasesprogramadas cp
            LEFT JOIN entrenamientos e
                ON cp.identrenamiento = e.id
            LEFT JOIN profesores p
                ON cp.idprofesor = p.id
            ORDER BY cp.fechahora ASC;
        `;
        const resultado = await pool.query(query);
        return resultado.rows;
    }
    async crear(
        identrenamiento,
        idprofesor,
        cupoMaximo,
        hora_inicio
    ) {
        try {
            const fechaHoy =
                new Date().toISOString().split("T")[0];
            const fechaHora =
                `${fechaHoy} ${hora_inicio}:00`;
            const query = `
                INSERT INTO clasesprogramadas
                (
                    identrenamiento,
                    idprofesor,
                    fechahora,
                    cupomaximo
                )
                VALUES
                (
                    $1,
                    $2,
                    $3,
                    $4
                )
                RETURNING *,
                cupomaximo AS cupo;
            `;
            const resultado = await pool.query(query, [
                identrenamiento,
                idprofesor,
                fechaHora,
                cupoMaximo
            ]);
            return resultado.rows[0];
        }
        catch (error) {
            console.error(
                "Error al crear la clase programada:",
                error
            );
            throw error;
        }
    }
    async actualizar(
        id,
        identrenamiento,
        idprofesor,
        cupoMaximo,
        hora_inicio
    ) {
        try {
            const fechaHoy =
                new Date().toISOString().split("T")[0];
            const fechaHora =
                `${fechaHoy} ${hora_inicio}:00`;
            const query = `
                UPDATE clasesprogramadas
                SET
                    identrenamiento = $1,
                    idprofesor = $2,
                    fechahora = $3,
                    cupomaximo = $4
                WHERE id = $5
                RETURNING *,
                cupomaximo AS cupo;
            `;
            const resultado = await pool.query(query, [
                identrenamiento,
                idprofesor,
                fechaHora,
                cupoMaximo,
                id
            ]);
            return resultado.rows[0];
        }
        catch (error) {
            console.error(
                "Error al actualizar la clase programada:",
                error
            );
            throw error;
        }
    }
    async eliminar(id) {
        const query = `
            DELETE FROM clasesprogramadas
            WHERE id = $1
            RETURNING *;
        `;
        const resultado = await pool.query(query, [id]);
        return resultado.rows[0];
    }
}