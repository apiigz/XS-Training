import {Router} from 'express'; 
import {controladorClasesProgramadas} from '../controllers/controladorClasesProgramadas.mjs';
import { comprobarToken } from '../middlewares/comprobarToken.mjs';

const router = Router();

const controlador = new controladorClasesProgramadas();

router.get('/clasesprogramadas', controlador.getClasesProgramadas);
router.post('/clasesprogramadas', comprobarToken, controlador.postClase);
router.put('/clasesprogramadas/:id', comprobarToken, controlador.putClase);
router.delete('/clasesprogramadas/:id', comprobarToken, controlador.deleteClase);

export default router;