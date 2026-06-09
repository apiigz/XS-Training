import {pool} from '../config/db.mjs';

export class UsuarioRepository{
    async obtenerUsuarios(){
        try {
            const resultado = await pool.query('SELECT u.id, u.correo, r.nombre as rol FROM usuario u JOIN roles r ON u.idRol = r.id');
            return resultado.rows;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }

    async obtenerUsuarioPorCorreo(correo) {
        try {
            const resultado = await pool.query('SELECT u.id, u.correo, u.contrasena, r.nombre as rol FROM usuario u JOIN roles r ON u.idRol = r.id WHERE u.correo = $1', [correo]);
            console.log('Resultado de la consulta por correo:', resultado.rows);
            return resultado.rows[0];
        } catch (error) {
            console.error('Error al obtener usuario por correo:', error);
            throw error;
        }
    }
}