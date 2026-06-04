import {pool} from '../config/db.mjs';

export class obtenerTestimonios{
    async obtenerTestimonios(req, res){
        try {
            const resultado = await pool.query('SELECT * FROM testimonios');
            return resultado.rows;
        } catch (error) {
            console.error('Error al obtener testimonios:', error);
            throw error;
        }
    }
}

