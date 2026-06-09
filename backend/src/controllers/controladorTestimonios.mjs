import {obtenerTestimonios} from '../repositories/dbTestimonios.mjs'

const repo = new obtenerTestimonios()

export class controladorTestimonios{
    async getTestimonios(req, res){
        try {
            const testimonios = await repo.obtenerTestimonios();
            res.json(testimonios);
        } catch (error) {
            console.error('Error al obtener testimonios:', error);
            res.status(500).json({ error: 'Error al obtener testimonios' });
        }
    }

    async postTestimonio(req, res) {
        try {
            const { autor, contenido } = req.body;
            if (!autor || !contenido) {
                return res.status(400).json({ error: 'El nombre del autor y el contenido son requeridos.' });
            }
            const nuevo = await repo.crear(autor, contenido);
            return res.status(201).json(nuevo);
        } catch (error) {
            console.error('Error al crear testimonio:', error);
            return res.status(500).json({ error: 'Error al registrar el testimonio' });
        }
    }

    async putTestimonio(req, res) {
        try {
            const { id } = req.params;
            const { autor, contenido } = req.body;
            
            const actualizado = await repo.actualizar(id, autor, contenido);
            if (!actualizado) {
                return res.status(404).json({ error: 'El testimonio no existe.' });
            }
            return res.json(actualizado);
        } catch (error) {
            console.error('Error al actualizar testimonio:', error);
            return res.status(500).json({ error: 'Error al actualizar el testimonio' });
        }
    }

    async deleteTestimonio(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await repo.eliminar(id);
            if (!eliminado) {
                return res.status(404).json({ error: 'El testimonio no existe o ya fue eliminado.' });
            }
            return res.json({ mensaje: 'Testimonio eliminado correctamente', testimonio: eliminado });
        } catch (error) {
            console.error('Error al eliminar testimonio:', error);
            return res.status(500).json({ error: 'Error al eliminar el testimonio' });
        }
    }
}