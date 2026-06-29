import {Router} from 'express'; 
import {controladorClasesProgramadas} from '../controllers/controladorClasesProgramadas.mjs';

const router = Router();

const controlador = new controladorClasesProgramadas();

router.get('/clasesprogramadas', controlador.getClasesProgramadas);
router.post('/clasesprogramadas', controlador.postClase);
router.put('/clasesprogramadas/:id', controlador.putClase);
router.delete('/clasesprogramadas/:id', controlador.deleteClase);

export default router;