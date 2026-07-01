import {Router} from 'express'; 
import {controladorTestimonios} from '../controllers/controladorTestimonios.mjs';
import { comprobarToken } from '../middlewares/comprobarToken.mjs';

const router = Router();

const controlador = new controladorTestimonios();

router.get('/testimonios', controlador.getTestimonios);
router.post('/testimonios', comprobarToken, controlador.registrarTestimonio);
router.put('/testimonios/:id', comprobarToken, controlador.putTestimonio);
router.delete('/testimonios/:id', comprobarToken, controlador.deleteTestimonio);

export default router;