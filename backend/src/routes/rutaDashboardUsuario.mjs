import { Router } from "express";
import { controladorDashboardUsuario } from "../controllers/controladorDashboardUsuario.mjs";
import {comprobarToken} from '../middlewares/comprobarToken.mjs'

const router = Router();

const controlador = new controladorDashboardUsuario();

router.get("/mi-suscripcion", comprobarToken, controlador.getMiSuscripcion);
router.get("/mis-reservas", comprobarToken, controlador.getMisReservas);
router.get("/clases-disponibles", comprobarToken, controlador.getClasesDisponibles);
router.post("/reservar", comprobarToken, controlador.postReserva);

export default router;