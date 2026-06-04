import {Router} from 'express'; 

import {controladorEntrenamientos} from '../controllers/controladorEntrenamientos.mjs';

const router = Router();

const controlador = new controladorEntrenamientos();

router.get('/entrenamientos', controlador.getEntrenamientos);

export default router;