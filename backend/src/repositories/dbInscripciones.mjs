import {pool} from '../config/config.mjs';

export class obtenerInscripciones{
    async obtenerInscripciones(req, res){
        try {
            const resultado = await pool.query('SELECT * FROM inscripciones');
            return resultado.rows;
        }catch (error) {
            console.error('Error al obtener inscripciones:', error);
            throw error;
        }
    }
    async crear(nombre, apellido, dni, numtelefono, correo) {
        try {
            const query = `
                INSERT INTO inscripciones (nombre, apellido, dni, numtelefono, correo)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, nombre, apellido;
            `;
            const resultado = await pool.query(query, [nombre, apellido, dni, numtelefono, correo]);
            return resultado.rows[0];
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    async actualizar(id, nombre, apellido, dni, numtelefono, correo) {
        try{
            const query = `
            UPDATE inscripciones 
            SET nombre = $1, apellido = $2, dni = $3, numtelefono = $4, correo = $5 
            WHERE id = $6 
            RETURNING *;
        `;
        // $1=nombre, $2=apellido, $3=dni, $4=numtelefono, $5=correo, $6=id
        const resultado = await pool.query(query, [nombre, apellido, dni, numtelefono, correo, id]);
        return resultado.rows[0];
        }catch(error){
            console.log(error)
        }
    }
    async eliminar(id) {
        const query = 'DELETE FROM inscripciones WHERE id = $1 RETURNING *;';
        const resultado = await pool.query(query, [id]);
        return resultado.rows[0];
    }
}