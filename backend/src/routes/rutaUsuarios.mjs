import {Router} from 'express'; 

import {controladorUsuarios} from '../controllers/controladorUsuarios.mjs';

const router = Router();

const controlador = new controladorUsuarios();

router.get('/usuarios', controlador.getUsuarios);
router.post('/auth/login', controlador.login);

export default router;