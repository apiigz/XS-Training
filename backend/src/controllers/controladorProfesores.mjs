import {obtenerProfesores} from '../repositories/dbProfesores.mjs'

const repo = new obtenerProfesores()

export class controladorProfesores{
    async getProfesores(req, res){
        try {
            const profesores = await repo.obtenerProfesores();
            res.json(profesores);
        } catch (error) {
            console.error('Error al obtener profesores:', error);
            res.status(500).json({ error: 'Error al obtener profesores' });
        }
    } 
}

//Falta el resto de métodos para profesores (crear, actualizar, eliminar)