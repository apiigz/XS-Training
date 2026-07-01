import {Router} from 'express'; 
import {controladorSuscripciones} from '../controllers/controladorSuscripciones.mjs';
import { comprobarToken } from '../middlewares/comprobarToken.mjs';

const router = Router();

const controlador = new controladorSuscripciones();

//Lo mismo que las clases. Las puse a todas en privadass

router.get('/suscripciones', comprobarToken, controlador.getSuscripciones);
router.post('/suscripciones', comprobarToken, controlador.postSuscripcion);
router.put('/suscripciones/:id', comprobarToken, controlador.putSuscripcion);
router.delete('/suscripciones/:id', comprobarToken, controlador.deleteSuscripcion);

export default router;