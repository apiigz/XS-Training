import { obtenerSuscripciones } from '../repositories/dbSuscripciones.mjs';

const repo = new obtenerSuscripciones();

export class controladorSuscripciones {
    async getSuscripciones(req, res) {
        try {
            const suscripciones =
                await repo.obtenerSuscripciones();
            return res.json(suscripciones);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Error al obtener las suscripciones."
            });
        }
    }
    async postSuscripcion(req, res) {
        try {
            const {
                idusuario,
                identrenamiento,
                fechapago,
                fechavencimiento,
                monto,
                estado
            } = req.body;
            const nueva = await repo.crear(
                idusuario,
                identrenamiento,
                fechapago,
                fechavencimiento,
                monto,
                estado
            );
            return res.status(201).json(nueva);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Error al crear la suscripción."
            });
        }
    }
    async putSuscripcion(req, res) {
        try {
            const { id } = req.params;
            const {
                idusuario,
                identrenamiento,
                fechapago,
                fechavencimiento,
                monto,
                estado
            } = req.body;
            const actualizada = await repo.actualizar(
                id,
                idusuario,
                identrenamiento,
                fechapago,
                fechavencimiento,
                monto,
                estado
            );
            if (!actualizada) {
                return res.status(404).json({
                    error: "La suscripción no existe."
                });
            }
            return res.json(actualizada);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Error al actualizar la suscripción."
            });
        }
    }
    async deleteSuscripcion(req, res) {
        try {
            const { id } = req.params;
            const eliminada =
                await repo.eliminar(id);
            if (!eliminada) {
                return res.status(404).json({
                    error: "La suscripción no existe."
                });
            }
            return res.json({
                mensaje: "Suscripción eliminada correctamente.",
                suscripcion: eliminada
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Error al eliminar la suscripción."
            });
        }
    }
}