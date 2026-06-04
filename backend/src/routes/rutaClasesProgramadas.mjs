import {Router} from 'express'; 

import {controladorClasesProgramadas} from '../controllers/controladorClasesProgramadas.mjs';

const router = Router();

const controlador = new controladorClasesProgramadas();

router.get('/clases-programadas', controlador.getClasesProgramadas);

export default router;