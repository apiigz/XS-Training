import {Router} from 'express'; 
import {controladorRoles} from '../controllers/controladorRoles.mjs';
import { comprobarToken } from '../middlewares/comprobarToken.mjs';

const router = Router();

const controlador = new controladorRoles();

router.get('/roles', comprobarToken, controlador.getRoles);

export default router;