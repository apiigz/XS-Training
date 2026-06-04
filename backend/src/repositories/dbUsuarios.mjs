import {pool} from '../config/db.mjs';

export class obtenerUsuarios{
    async obtenerUsuarios(req, res){
        try {
            const resultado = await pool.query('SELECT u.id, u.correo, r.nombre as rol FROM usuario u JOIN roles r ON u.idRol = r.id');
            return resultado.rows;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }
}