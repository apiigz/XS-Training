import {pool} from '../config/db.mjs';

export class obtenerInscripciones{
    async obtenerInscripciones(req, res){
        try {
            const resultado = await pool.query('SELECT * FROM inscripciones');
            return resultado.rows;
        }catch (error) {
            console.error('Error al obtener inscripciones:', error);
            throw error;
        }
    }
}