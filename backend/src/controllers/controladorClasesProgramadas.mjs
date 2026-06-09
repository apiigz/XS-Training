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
    
    async postClase(req, res) {
    try {
        const { identrenamiento, idprofesor, cupo, dia, hora_inicio } = req.body;
        // Mandamos 'cupo' al parámetro de cupoMaximo
        const nueva = await repo.crear(identrenamiento, idprofesor, cupo, dia, hora_inicio);
        return res.status(201).json(nueva);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al insertar en clasesprogramadas' });
    }
}

async putClase(req, res) {
    try {
        const { id } = req.params;
        const { identrenamiento, idprofesor, cupo, hora_inicio } = req.body;
        const actualizada = await repo.actualizar(id, identrenamiento, idprofesor, cupo, hora_inicio);
        return res.json(actualizada);
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar clasesprogramadas' });
    }
}

    async deleteClase(req, res) {
        try {
            const { id } = req.params;
            await repo.eliminar(id);
            return res.json({ mensaje: 'Clase eliminada del cronograma correctamente' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al eliminar la clase' });
        }
    }
}