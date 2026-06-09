import {Router} from 'express'; 

import {controladorSuscripciones} from '../controllers/controladorSuscripciones.mjs';

const router = Router();

const controlador = new controladorSuscripciones();

router.get('/suscripciones', controlador.getSuscripciones);
router.post('/suscripciones', controlador.postSuscripcion);
router.put('/suscripciones/:id', controlador.putSuscripcion);
router.delete('/suscripciones/:id', controlador.deleteSuscripcion);

export default router;