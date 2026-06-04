import {Router} from 'express'; 

import {controladorPerfiles} from '../controllers/controladorPerfiles.mjs';

const router = Router();

const controlador = new controladorPerfiles();

router.get('/perfiles', controlador.getPerfiles);

export default router;