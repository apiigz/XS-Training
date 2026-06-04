import {pool} from '../config/db.mjs';

export class obtenerSuscripciones{
    async obtenerSuscripciones(req, res){
        try {
            const resultado = await pool.query('SELECT s.id, u.correo AS nombreUsuario, e.nombre AS nombreEntrenamiento, s.fechaPago, s.fechaVencimiento, s.monto, s.estado FROM suscripciones s JOIN usuario u ON s.idUsuario = u.id JOIN entrenamientos e ON s.idEntrenamiento = e.id');
            return resultado.rows;
        } catch (error) {
            console.error('Error al obtener las suscripciones:', error);
            throw error;   
        }
    }
}