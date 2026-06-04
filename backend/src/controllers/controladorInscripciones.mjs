import {obtenerInscripciones} from '../repositories/dbInscripciones.mjs'

const repo = new obtenerInscripciones()

export class controladorInscripciones{
    async getInscripciones(req, res){
        try {
            const inscripciones = await repo.obtenerInscripciones();
            res.json(inscripciones);
        } catch (error) {
            console.error('Error al obtener las inscripciones:', error);
            res.status(500).json({ error: 'Error al obtener las inscripciones' });
        }
    } 
}
