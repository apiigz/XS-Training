import {obtenerSuscripciones} from '../repositories/dbSuscripciones.mjs';

const repo = new obtenerSuscripciones()

export class controladorSuscripciones{
    async getSuscripciones(req, res){
        try {
            const suscripciones = await repo.obtenerSuscripciones();
            res.json(suscripciones);
        } catch (error) {
            console.error('Error al obtener las suscripciones:', error);
            res.status(500).json({ error: 'Error al obtener las suscripciones' });
        }
    }
}