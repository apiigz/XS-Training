import {obtenerUsuarios} from '../repositories/dbUsuarios.mjs'

const repo = new obtenerUsuarios()

export class controladorUsuarios{
    async getUsuarios(req, res){
        try {
            const usuarios = await repo.obtenerUsuarios();
            res.json(usuarios);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    } 
}