import {Router} from 'express'; //=> no, no está vibecodeado... por las dudas.

import {controladorProfesores} from '../controllers/controladorProfesores.mjs';

const router = Router();

const controlador = new controladorProfesores();

router.get('/profesores', controlador.getProfesores);

export default router;