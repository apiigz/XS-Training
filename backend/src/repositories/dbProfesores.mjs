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
}

//Falta el resto de métodos para profesores (crear, actualizar, eliminar)