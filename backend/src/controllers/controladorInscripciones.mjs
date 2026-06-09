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

    async postInscripcion(req, res) {
        try {
        console.log('Cuerpo del req.body:', req.body);
        const { nombre, apellido, dni, telefono, correo } = req.body;
        const nueva = await repo.crear(nombre, apellido, dni, telefono, correo);
        console.log('Inscripción creada con éxito en la Base de Datos:', nueva);
        return res.status(201).json(nueva);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Error interno al registrar inscripción', 
            detalle: error.message 
        });
    }
    }

    async putInscripcion(req, res) {
        try {
            const { id } = req.params;
            const { nombre, apellido, dni, telefono, correo } = req.body;

            const actualizada = await repo.actualizar(id, nombre, apellido, dni, telefono, correo);
            
            if (!actualizada) {
                return res.status(404).json({ error: 'La inscripción no existe en el sistema.' });
            }
            return res.json(actualizada);
        } catch (error) {
            return res.status(500).json({ error: 'Error al actualizar la inscripción' });
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
