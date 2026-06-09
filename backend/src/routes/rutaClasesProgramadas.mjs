import {Router} from 'express'; 

import {controladorClasesProgramadas} from '../controllers/controladorClasesProgramadas.mjs';

const router = Router();

const controlador = new controladorClasesProgramadas();

router.get('/clases-programadas', controlador.getClasesProgramadas);
router.post('/clases-programadas', controlador.postClase);
router.put('/clases-programadas/:id', controlador.putClase);
router.delete('/clases-programadas/:id', controlador.deleteClase);

export default router;