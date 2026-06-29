import {pool} from '../config/config.mjs';

export class obtenerEstados{
    async obtenerEstados(req, res){
        try {
            const resultado = await pool.query('SELECT * FROM estados');
            return resultado.rows;
        }catch (error) {
            console.error('Error al obtener los estados de pago:', error);
            throw error;
        }
    }
}