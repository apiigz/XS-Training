import {Router} from 'express'; 

import {controladorReservas} from '../controllers/controladorReservas.mjs';

const router = Router();

const controlador = new controladorReservas();

router.get('/reservas', controlador.getReservas);

export default router;