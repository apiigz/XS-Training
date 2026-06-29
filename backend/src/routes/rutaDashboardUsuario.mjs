import { Router } from "express";
import { controladorDashboardUsuario } from "../controllers/controladorDashboardUsuario.mjs";
import { verificarCookies } from "../controllers/controladorUsuarios.mjs";

const router = Router();

const controlador = new controladorDashboardUsuario();

router.get("/mi-suscripcion", verificarCookies, controlador.getMiSuscripcion);
router.get("/mis-reservas", verificarCookies, controlador.getMisReservas);
router.get("/clases-disponibles", verificarCookies, controlador.getClasesDisponibles);
router.post("/reservar", verificarCookies, controlador.postReserva);

export default router;