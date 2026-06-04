import {obtenerClasesProgramadas} from '../repositories/dbClasesProgramadas.mjs'

const repo = new obtenerClasesProgramadas()

export class controladorClasesProgramadas{
    async getClasesProgramadas(req, res){
        try {
            const clasesProgramadas = await repo.obtenerClasesProgramadas();
            res.json(clasesProgramadas);
        } catch (error) {
            console.error('Error al obtener las clases programadas:', error);
            res.status(500).json({ error: 'Error al obtener las clases programadas' });
        }
    } 
}