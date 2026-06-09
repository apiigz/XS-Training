import {UsuarioRepository} from '../repositories/dbUsuarios.mjs'

const repo = new UsuarioRepository()

export class controladorUsuarios{
    async getUsuarios(req, res){
        try {
            const usuarios = await repo.obtenerUsuarios();
            res.json(usuarios);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }
    
    async login(req, res){
        try{
            console.log('Datos recibidos en el login:', req.body);
            const { correo, contrasena } = req.body;
            const usuario = await repo.obtenerUsuarioPorCorreo(correo);

            if (!usuario.correo) {
                return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
            } //=> Parte de un sistema completamente arcaico e inseguro, pero es lo que hay por ahora

            if (usuario.contrasena !== contrasena) {
                return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
            } //=> Lo mismo, esto es solo para pruebas, no se debe usar en producción

            return res.status(200).json({
                mensaje: 'Login exitoso',
                usuario: {
                    id: usuario.id,
                    correo: usuario.correo,
                    rol: usuario.rol
                }
            });
        } catch (error) {
            console.error('Error en el login:', error);
            res.status(500).json({ error: 'Error en el proceso de login' });
        }
    }
}


