import { obtenerDashboardUsuario } from "../repositories/dbDashboardUsuario.mjs";

const repo = new obtenerDashboardUsuario();

export class controladorDashboardUsuario {
    async getMiSuscripcion(req, res) {
        try {
            const idUsuario = req.usuario.id;
            const suscripcion =
                await repo.obtenerMiSuscripcion(idUsuario);
            return res.json(suscripcion);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Error al obtener la suscripción."
            });
        }
    }
    async getMisReservas(req, res) {
        try {
            const idUsuario = req.usuario.id;
            const reservas =
                await repo.obtenerMisReservas(idUsuario);
            return res.json(reservas);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Error al obtener las reservas."
            });
        }
    }
    async getClasesDisponibles(req, res) {
        try {
            const clases =
                await repo.obtenerClasesDisponibles();
            return res.json(clases);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Error al obtener las clases."
            });
        }
    }
    async postReserva(req, res) {
        try {
            const idUsuario = req.usuario.id;
            const { idClase } = req.body;
            const reserva = await repo.reservarClase(
                idUsuario,
                idClase
            );
            return res.status(201).json(reserva);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: error.message
            });
        }
    }
}