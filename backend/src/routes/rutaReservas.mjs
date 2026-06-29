import {Router} from 'express'; 
import {controladorReservas} from '../controllers/controladorReservas.mjs';

const router = Router();

const controlador = new controladorReservas();

router.get('/reservas', controlador.getReservas);
router.post('/reservas', controlador.postReserva);
router.put('/reservas/:id', controlador.putReserva);
router.delete('/reservas/:id', controlador.deleteReserva);

export default router;