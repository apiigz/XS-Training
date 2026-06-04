import {Router} from 'express'; 

import {controladorSuscripciones} from '../controllers/controladorSuscripciones.mjs';

const router = Router();

const controlador = new controladorSuscripciones();

router.get('/suscripciones', controlador.getSuscripciones);

export default router;