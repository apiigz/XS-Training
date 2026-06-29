import {Router} from 'express'; 
import {controladorRoles} from '../controllers/controladorRoles.mjs';

const router = Router();

const controlador = new controladorRoles();

router.get('/roles', controlador.getRoles);

export default router;