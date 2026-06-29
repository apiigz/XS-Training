import {obtenerReservas} from '../repositories/dbReservas.mjs';

const repo = new obtenerReservas()

export class controladorReservas{
    async getReservas(req, res){
        try {
            const reservas = await repo.obtenerReservas();
            res.json(reservas);
        } catch (error) {
            console.error('Error al obtener reservas:', error);
            res.status(500).json({ error: 'Error al obtener reservas' });
        }
    }
    async postReserva(req, res) {
        try {
            const { idusuario, idclaseprogramada, estado } = req.body;
            const nueva = await repo.crear(idusuario, idclaseprogramada, estado);
            return res.status(201).json(nueva);
        } catch (error) {
            return res.status(500).json({ error: 'Error al procesar reserva en la base de datos' });
        }
    }
    async putReserva(req, res) {
        try {
            const { id } = req.params;
            const { estado } = req.body; 
            const actualizada = await repo.actualizar(id, estado);
            return res.json(actualizada);
        } catch (error) {
            return res.status(500).json({ error: 'Error al actualizar asistencia del turno' });
        }
    }
    async deleteReserva(req, res) {
        try {
            const { id } = req.params;
            await repo.eliminar(id);
            return res.json({ mensaje: 'Reserva dada de baja' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al dar de baja' });
        }
    }
}