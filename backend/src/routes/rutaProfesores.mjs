import {Router} from 'express'; 

import {controladorProfesores} from '../controllers/controladorProfesores.mjs';

const router = Router();

const controlador = new controladorProfesores();

router.get('/profesores', controlador.getProfesores);
router.post('/profesores', controlador.postProfesor);
router.put('/profesores/:id', controlador.putProfesor);
router.delete('/profesores/:id', controlador.deleteProfesor);

export default router;