import {pool} from '../config/config.mjs';

export class obtenerPerfiles{
    async obtenerPerfiles(req, res){
        try {
            const resultado = await pool.query('SELECT p.id, r.nombre AS rol, p.nombre, p.apellido, p.dni, p.numTelefono, p.correo FROM perfiles p JOIN usuario u ON p.idUsuario = u.id JOIN roles r ON u.idRol = r.id');
            return resultado.rows;
        }catch (error) {
            console.error('Error al obtener perfiles:', error);
            throw error;
        }
    }
}