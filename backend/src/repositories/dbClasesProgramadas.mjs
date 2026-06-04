import {pool} from '../config/db.mjs';

export class obtenerClasesProgramadas{
    async obtenerClasesProgramadas(req, res){
        try {
            const resultado = await pool.query('SELECT cp.id, e.nombre AS nombreEntrenamiento, p.nombre AS nombreProfesor, cp.fechaHora, cp.cupoMaximo FROM clasesProgramadas cp JOIN entrenamientos e ON cp.idEntrenamiento = e.id JOIN profesores p ON cp.idProfesor = p.id');
            //Por alguna razón, con el TIMESTAMP, me devuelve una fecha, y hora, de manera medio rara. Vamos a solucionarlo después.
            return resultado.rows;
        }catch (error) {
            console.error('Error al obtener las clases programadas:', error);
            throw error;
        }
    }
}