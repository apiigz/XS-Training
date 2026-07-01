import {Router} from 'express'; 
import {controladorEstados} from '../controllers/controladorEstados.mjs';
import { comprobarToken } from '../middlewares/comprobarToken.mjs';

const router = Router();

const controlador = new controladorEstados();

router.get('/estados', comprobarToken, controlador.getEstados);

export default router;