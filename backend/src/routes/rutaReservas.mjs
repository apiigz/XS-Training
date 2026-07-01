import {Router} from 'express'; 
import {controladorReservas} from '../controllers/controladorReservas.mjs';
import { comprobarToken } from '../middlewares/comprobarToken.mjs';

const router = Router();

const controlador = new controladorReservas();

//Cómo es información privada, todas las rutas tienen que estar protegidas. A diferencia de las otras en las qué deje el
//GET sin proteger, ya qué la página web es también pública, y esa información que no protegí es, en efecto, pública.

router.get('/reservas', comprobarToken, controlador.getReservas);
router.post('/reservas', comprobarToken, controlador.postReserva);
router.put('/reservas/:id', comprobarToken, controlador.putReserva);
router.delete('/reservas/:id', comprobarToken, controlador.deleteReserva);

export default router;