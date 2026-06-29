import { Router } from 'express';
import { controladorUsuarios } from '../controllers/controladorUsuarios.mjs';

const router = Router();

const controlador = new controladorUsuarios();

router.get('/usuarios', controlador.getUsuarios);
router.post('/auth/registrar', controlador.registrarUsuario);
router.post('/auth/login', controlador.login);
router.post('/auth/logout', controlador.logout);
router.get('/auth/verificar', controlador.verificarSesion);

export default router;