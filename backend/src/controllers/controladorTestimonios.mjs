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
    async registrarTestimonio(req, res) {
        const { autor, contenido } = req.body;
        const autorLimpio = (!autor || autor.trim() === 'Tu nombre') ? 'Alumno Anónimo' : autor.trim();
        if (!contenido || contenido.trim() === 'Tu experiencia') {
            return res.status(400).json({ 
                error: 'Por favor, escribe un comentario sobre tu experiencia antes de enviar.' 
            });
        }
        try {
            await repo.crear(autorLimpio, contenido.trim());
            return res.status(201).json({ 
                mensaje: '¡Muchas gracias! Tu testimonio ha sido guardado correctamente.' 
            });
        } catch (error) {
            console.error('Error en el controlador:', error);
            return res.status(500).json({ error: 'No se pudo guardar el testimonio.' });
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