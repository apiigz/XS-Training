import {pool} from '../config/db.mjs';

export class obtenerRoles{
    async obtenerRoles(req, res){
        try {
            const resultado = await pool.query('SELECT * FROM roles');
            return resultado.rows;
        } catch (error) {
            console.error('Error al obtener roles:', error);
            throw error;   
        }
    }
}