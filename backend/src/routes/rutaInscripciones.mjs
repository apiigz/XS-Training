import {Router} from 'express'; 
import {controladorInscripciones} from '../controllers/controladorInscripciones.mjs';
import { comprobarToken } from '../middlewares/comprobarToken.mjs';

const router = Router();

const controlador = new controladorInscripciones();

router.get('/inscripciones', comprobarToken, controlador.getInscripciones);
router.post('/inscripciones', controlador.registrarInscripcion); //=> Es la única que no protegí, ya que tenemos una sección, en la página, para inscribirse, así que la deje en pública.
router.put('/inscripciones/:id', comprobarToken, controlador.putInscripcion)
router.delete('/inscripciones/:id', comprobarToken, controlador.deleteInscripcion);

export default router;