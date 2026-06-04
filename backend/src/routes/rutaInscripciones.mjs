import {Router} from 'express'; 

import {controladorInscripciones} from '../controllers/controladorInscripciones.mjs';

const router = Router();

const controlador = new controladorInscripciones();

router.get('/inscripciones', controlador.getInscripciones);

export default router;