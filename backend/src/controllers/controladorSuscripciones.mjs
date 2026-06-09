import {obtenerSuscripciones} from '../repositories/dbSuscripciones.mjs';

const repo = new obtenerSuscripciones()

export class controladorSuscripciones{
    async getSuscripciones(req, res){
        try {
            const suscripciones = await repo.obtenerSuscripciones();
            res.json(suscripciones);
        } catch (error) {
            console.error('Error al obtener las suscripciones:', error);
            res.status(500).json({ error: 'Error al obtener las suscripciones' });
        }
    }

    async postSuscripcion(req, res) {
        try {
            const { idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado } = req.body;
            const nueva = await repo.crear(idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado);
            return res.status(201).json(nueva);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al impactar POST en Postgres' });
        }
    }

    async putSuscripcion(req, res) {
        try {
            const { id } = req.params;
            const { idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado } = req.body;
            const actualizada = await repo.actualizar(id, idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado);
            return res.json(actualizada);
        } catch (error) {
            return res.status(500).json({ error: 'Error al impactar PUT en Postgres' });
        }
    }

    async deleteSuscripcion(req, res) {
        try {
            const { id } = req.params;
            await repo.eliminar(id);
            return res.json({ mensaje: 'Borrado con éxito' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al eliminar' });
        }
    }
}