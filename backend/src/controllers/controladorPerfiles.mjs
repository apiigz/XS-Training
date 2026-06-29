import {obtenerPerfiles} from '../repositories/dbPerfiles.mjs'

const repo = new obtenerPerfiles()

export class controladorPerfiles{
    async getPerfiles(req, res){
        try {
            const perfiles = await repo.obtenerPerfiles();
            res.json(perfiles);
        } catch (error) {
            console.error('Error al obtener los perfiles:', error);
            res.status(500).json({ error: 'Error al obtener los perfiles' });
        }
    } 
}