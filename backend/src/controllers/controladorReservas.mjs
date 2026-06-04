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
}