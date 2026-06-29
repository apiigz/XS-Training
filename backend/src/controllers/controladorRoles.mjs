import {obtenerRoles} from '../repositories/dbRoles.mjs';

const repo = new obtenerRoles()

export class controladorRoles{
    async getRoles(req, res){
        try {
            const roles = await repo.obtenerRoles();
            res.json(roles);
        } catch (error) {
            console.error('Error al obtener roles:', error);
            res.status(500).json({ error: 'Error al obtener roles' });
        }
    }
}