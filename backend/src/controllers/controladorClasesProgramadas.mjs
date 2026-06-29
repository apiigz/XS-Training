import { obtenerClasesProgramadas } from '../repositories/dbClasesProgramadas.mjs';

const repo = new obtenerClasesProgramadas();

export class controladorClasesProgramadas {
    async getClasesProgramadas(req, res) {
        try {
            const clasesProgramadas =
                await repo.obtenerClasesProgramadas();
            return res.json(clasesProgramadas);
        } catch (error) {
            console.error("Error al obtener las clases programadas:", error);
            return res.status(500).json({
                error: "Error al obtener las clases programadas"
            });
        }
    }
    async postClase(req, res) {
        try {
            const {
                identrenamiento,
                idprofesor,
                cupo,
                hora_inicio
            } = req.body;
            const nueva = await repo.crear(
                identrenamiento,
                idprofesor,
                cupo,
                hora_inicio
            );
            return res.status(201).json(nueva);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Error al insertar la clase programada"
            });
        }
    }
    async putClase(req, res) {
        try {
            const { id } = req.params;
            const {
                identrenamiento,
                idprofesor,
                cupo,
                hora_inicio
            } = req.body;
            const actualizada = await repo.actualizar(
                id,
                identrenamiento,
                idprofesor,
                cupo,
                hora_inicio
            );
            if (!actualizada) {
                return res.status(404).json({
                    error: "La clase no existe."
                });
            }
            return res.json(actualizada);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Error al actualizar la clase."
            });
        }
    }
    async deleteClase(req, res) {
        try {
            const { id } = req.params;
            const eliminada = await repo.eliminar(id);
            if (!eliminada) {
                return res.status(404).json({
                    error: "La clase no existe."
                });
            }
            return res.json({
                mensaje: "Clase eliminada correctamente.",
                clase: eliminada
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Error al eliminar la clase."
            });
        }
    }
}