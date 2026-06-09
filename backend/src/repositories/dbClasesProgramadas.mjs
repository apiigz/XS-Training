import {pool} from '../config/db.mjs';

export class obtenerClasesProgramadas{
    async obtenerClasesProgramadas(req, res){ //El timestamp me obligo a reescribir todo.
        const query = `
            SELECT 
                cp.id, 
                cp.identrenamiento, 
                cp.idprofesor, 
                cp.cupomaximo as cupo, 
                CASE EXTRACT(ISODOW FROM cp.fechahora)
                    WHEN 1 THEN 'Lunes' WHEN 2 THEN 'Martes' WHEN 3 THEN 'Miércoles'
                    WHEN 4 THEN 'Jueves' WHEN 5 THEN 'Viernes' WHEN 6 THEN 'Sábado'
                    WHEN 7 THEN 'Domingo'
                END as dia,
                TO_CHAR(cp.fechahora, 'HH24:MI') as hora_inicio,
                TO_CHAR(cp.fechahora, 'YYYY-MM-DD') as fecha_base, 
                e.nombre as entrenamiento_nombre,
                p.nombre as profesor_nombre
            FROM clasesprogramadas cp
            LEFT JOIN entrenamientos e ON cp.identrenamiento = e.id
            LEFT JOIN profesores p ON cp.idprofesor = p.id
            ORDER BY cp.fechahora ASC;
        `;
        const resultado = await pool.query(query);
        return resultado.rows;
        //Si... imposible sin IA está parte igual. Por lo menos nos sacamos un dolor de cabeza.

        /*Básicamente está parte sirve para que el Chino (el futuro dueño de la página), cuando se meta a la pestaña de reservas
        pueda ver los horarios sin tantos números. Para que en vez de ver un '05' vea un 'Miércoles', y así. Es una lógica dificil para nosotros.
        */
    }

    async crear(identrenamiento, idprofesor, cupoMaximo, horaInicio) {
        try {
            const fechaHoy = new Date().toISOString().split('T')[0];
            const timestampUnificado = `${fechaHoy} ${horaInicio}:00`;

            const query = `
                INSERT INTO clasesprogramadas (identrenamiento, idprofesor, cupomaximo, fechahora)
                VALUES ($1::bigint, $2::bigint, $3::integer, $4::timestamp)
                RETURNING *, cupomaximo as cupo;
            `;
            const resultado = await pool.query(query, [identrenamiento, idprofesor, cupoMaximo, timestampUnificado]);
            return resultado.rows[0];
        } catch (error) {
            console.error('Error al crear la clase programada:', error);
            throw error;
        }
    }

    async actualizar(id, identrenamiento, idprofesor, cupoMaximo, horaInicio) {
        try {
            const fechaHoy = new Date().toISOString().split('T')[0];
            const timestampUnificado = `${fechaHoy} ${horaInicio}:00`;

            const query = `
                UPDATE clasesprogramadas
                SET identrenamiento = $1::bigint, idprofesor = $2::bigint, cupomaximo = $3::integer, fechahora = $4::timestamp
                WHERE id = $5::bigint
                RETURNING *, cupomaximo as cupo;
            `;
            const resultado = await pool.query(query, [identrenamiento, idprofesor, cupoMaximo, timestampUnificado, id]);
            return resultado.rows[0];
        } catch (error) {
            console.error('Error al actualizar la clase programada:', error);
            throw error;
        }
    }

    async eliminar(id) {
        try {
            const query = 'DELETE FROM clasesprogramadas WHERE id = $1::bigint RETURNING *;';
            const resultado = await pool.query(query, [id]);
            return resultado.rows[0];
        } catch (error) {
            console.error('Error al eliminar la clase programada:', error);
            throw error;
        }
    }
}