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
    async postProfesor(req, res) {
        try {
            const { nombre, descripcion, imagen } = req.body;
            const nuevo = await repo.crear(nombre, descripcion, imagen || '/imagenes/cuadro-subir-imagen.png');
            return res.status(201).json(nuevo);
        } catch (error) {
            return res.status(500).json({ error: 'Error al registrar profesor' });
        }
    }
    async putProfesor(req, res) {
        try {
            const { id } = req.params;
            const { nombre, descripcion, imagen } = req.body;
            const actualizado = await repo.actualizar(id, nombre, descripcion, imagen);
            if (!actualizado) return res.status(404).json({ error: 'El profesor no existe' });
            return res.json(actualizado);
        } catch (error) {
            return res.status(500).json({ error: 'Error al actualizar profesor' });
        }
    }
    async deleteProfesor(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await repo.eliminar(id);
            if (!eliminado) return res.status(404).json({ error: 'El profesor no existe' });
            return res.json({ mensaje: 'Profesor eliminado', profesor: eliminado });
        } catch (error) {
            return res.status(500).json({ error: 'Error al eliminar profesor' });
        }
    }
}