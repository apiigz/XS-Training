import {Router} from 'express'; 
import {controladorInscripciones} from '../controllers/controladorInscripciones.mjs';

const router = Router();

const controlador = new controladorInscripciones();

router.get('/inscripciones', controlador.getInscripciones);
router.post('/inscripciones', controlador.registrarInscripcion);
router.put('/inscripciones/:id', controlador.putInscripcion)
router.delete('/inscripciones/:id', controlador.deleteInscripcion);

export default router;