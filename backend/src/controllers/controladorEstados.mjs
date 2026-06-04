import {obtenerEstados} from '../repositories/dbEstados.mjs'

const repo = new obtenerEstados()

export class controladorEstados{
    async getEstados(req, res){
        try {
            const estados = await repo.obtenerEstados();
            res.json(estados);
        } catch (error) {
            console.error('Error al obtener los estados de pago:', error);
            res.status(500).json({ error: 'Error al obtener los estados de pago' });
        }
    } 
}