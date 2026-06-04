import {obtenerEntrenamientos} from '../repositories/dbEntrenamientos.mjs'

const repo = new obtenerEntrenamientos()

export class controladorEntrenamientos{
    async getEntrenamientos(req, res){
        try {
            const entrenamientos = await repo.obtenerEntrenamientos();
            res.json(entrenamientos);
        } catch (error) {
            console.error('Error al obtener los entrenamientos:', error);
            res.status(500).json({ error: 'Error al obtener los entrenamientos' });
        }
    } 
}