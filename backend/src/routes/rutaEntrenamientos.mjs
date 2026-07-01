import {Router} from 'express'; 
import {controladorEntrenamientos} from '../controllers/controladorEntrenamientos.mjs';
import {comprobarToken} from '../middlewares/comprobarToken.mjs'


const router = Router();

const controlador = new controladorEntrenamientos();

router.get('/entrenamientos', controlador.getEntrenamientos);
router.post('/entrenamientos', comprobarToken,controlador.postEntrenamiento);
router.put('/entrenamientos/:id', comprobarToken, controlador.putEntrenamiento);
router.delete('/entrenamientos/:id', comprobarToken,controlador.deleteEntrenamiento);

export default router;