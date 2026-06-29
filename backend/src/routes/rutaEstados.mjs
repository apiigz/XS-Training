import {Router} from 'express'; 
import {controladorEstados} from '../controllers/controladorEstados.mjs';

const router = Router();

const controlador = new controladorEstados();

router.get('/estados', controlador.getEstados);

export default router;