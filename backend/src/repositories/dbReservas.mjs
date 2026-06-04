import {pool} from '../config/db.mjs';

export class obtenerReservas{
    async obtenerReservas(req, res){
        try {
            const resultado = await pool.query('SELECT r.id, u.correo AS nombreUsuario, cp.fechaHora as fechaClase, r.fechaReserva, r.estado FROM reservas r JOIN clasesProgramadas cp ON r.idClaseProgramada = cp.id JOIN usuario u ON r.idUsuario = u.id');
            return resultado.rows;
        } catch (error) {
            console.error('Error al obtener reservas:', error);
            throw error;
        }
    }
}