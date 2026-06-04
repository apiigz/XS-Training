import {pool} from '../config/db.mjs';

export class obtenerEntrenamientos{
    async obtenerEntrenamientos(req, res){
        try {
            const resultado = await pool.query('SELECT * FROM entrenamientos');
            return resultado.rows;
        }catch (error) {
            console.error('Error al obtener los entrenamientos:', error);
            throw error;
        }
    }
}