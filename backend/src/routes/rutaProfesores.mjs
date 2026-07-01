import {Router} from 'express'; 
import {controladorProfesores} from '../controllers/controladorProfesores.mjs';
import { comprobarToken } from '../middlewares/comprobarToken.mjs';

const router = Router();

const controlador = new controladorProfesores();

router.get('/profesores', controlador.getProfesores);
router.post('/profesores', comprobarToken, controlador.postProfesor);
router.put('/profesores/:id', comprobarToken, controlador.putProfesor);
router.delete('/profesores/:id', comprobarToken, controlador.deleteProfesor);

export default router;