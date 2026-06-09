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
    
    async postEntrenamiento(req, res) {
        try {
            const { nombre, descripcion, imagen } = req.body;
            const nuevo = await repo.crear(nombre, descripcion, imagen || '/imagenes/cuadro-subir-imagen.png');
            return res.status(201).json(nuevo);
        } catch (error) {
            return res.status(500).json({ error: 'Error al crear entrenamiento' });
        }
    }

    async putEntrenamiento(req, res) {
        try {
            const { id } = req.params;
            const { nombre, descripcion, imagen } = req.body;
            const actualizado = await repo.actualizar(id, nombre, descripcion, imagen);
            
            if (!actualizado) {
                return res.status(404).json({ error: 'El entrenamiento no existe' });
            }
            return res.json(actualizado);
        } catch (error) {
            return res.status(500).json({ error: 'Error al actualizar entrenamiento' });
        }
    }

    async deleteEntrenamiento(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await repo.eliminar(id);
            
            if (!eliminado) {
                return res.status(404).json({ error: 'El entrenamiento ya no existe o ya fue eliminado' });
            }
            return res.json({ mensaje: 'Eliminado correctamente', entrenamiento: eliminado });
        } catch (error) {
            return res.status(500).json({ error: 'Error al eliminar entrenamiento en la base de datos' });
        }
    }
}