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
    async registrarInscripcion(req, res) {
        const { nombre, apellido, dni, numtelefono, correo } = req.body;
        if (!nombre || !apellido || !dni || !numtelefono || !correo) {
            return res.status(400).json({ 
                error: 'Todos los campos son obligatorios para procesar la inscripción.' 
            });
        }
        try {
            const nuevaInscripcion = await repo.crear(nombre, apellido, dni, numtelefono, correo);
            return res.status(201).json({
                mensaje: `¡Inscripción exitosa! Bienvenido/a ${nuevaInscripcion.nombre} al gimnasio.`,
                id: nuevaInscripcion.id
            });
        } catch (error) {
            console.error('Error en el controlador de inscripciones:', error);
            return res.status(500).json({ 
                error: 'Hubo un problema al procesar tu inscripción en el servidor.' 
            });
        }
    }
    async putInscripcion(req, res) {
        try {
            const { id } = req.params;
            const { nombre, apellido, dni, numtelefono, correo } = req.body;
            console.log(req.body)
            const actualizada = await repo.actualizar(id, nombre, apellido, dni, numtelefono, correo);
            if (!actualizada) {
                return res.status(404).json({ error: 'La inscripción no existe en el sistema.' });
            }
            return res.json(actualizada);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
            error: error.message
        });
}
    }
    async deleteInscripcion(req, res) {
        try {
            const { id } = req.params;
            const eliminada = await repo.eliminar(id);
            if (!eliminada) return res.status(404).json({ error: 'No encontrado' });
            return res.json({ mensaje: 'Eliminado', inscripcion: eliminada });
        } catch (error) {
            return res.status(500).json({ error: 'Error al eliminar' });
        }
    }
}