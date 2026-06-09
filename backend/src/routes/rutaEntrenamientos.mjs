import {Router} from 'express'; 

import {controladorEntrenamientos} from '../controllers/controladorEntrenamientos.mjs';

const router = Router();

const controlador = new controladorEntrenamientos();

router.get('/entrenamientos', controlador.getEntrenamientos);
router.post('/entrenamientos', controlador.postEntrenamiento);
router.put('/entrenamientos/:id', controlador.putEntrenamiento);
router.delete('/entrenamientos/:id', controlador.deleteEntrenamiento);

export default router;