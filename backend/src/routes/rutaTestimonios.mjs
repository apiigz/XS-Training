import {Router} from 'express'; 
import {controladorTestimonios} from '../controllers/controladorTestimonios.mjs';

const router = Router();

const controlador = new controladorTestimonios();

router.get('/testimonios', controlador.getTestimonios);
router.post('/testimonios', controlador.registrarTestimonio);
router.put('/testimonios/:id', controlador.putTestimonio);
router.delete('/testimonios/:id', controlador.deleteTestimonio);

export default router;