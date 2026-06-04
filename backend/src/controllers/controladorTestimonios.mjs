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
}