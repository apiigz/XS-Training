import {Router} from 'express'; 

import {controladorTestimonios} from '../controllers/controladorTestimonios.mjs';

const router = Router();

const controlador = new controladorTestimonios();

router.get('/testimonios', controlador.getTestimonios);

export default router;