# Pasos para crear una entidad y que se vea:

1. Creas una tabla en gimnasioComandos.SQL (después vemos que hacemos con esa tabla) en base a Diagrama SQL.png (\XS-Training\backend\src\models\Diagrama SQL.png)
    1.1 Algo así si es simple:

    CREATE TABLE roles(
        id BIGSERIAL PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL
    )

    1.2 O así si es una tabla intermedia (o depende de otros datos del diagrama):
    
    CREATE TABLE usuario (
        id BIGSERIAL PRIMARY KEY,
        correo VARCHAR(150) UNIQUE NOT NULL,
        pass VARCHAR(255) NOT NULL,
        idRol BIGINT NOT NULL,
        
        CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES roles(id)
    );

    1.3 Con un simple INSERT INTO (columnas) VALUES (valores) lo rellenas de datos.

2. En '/repositories' creas un archivo "db(nombre de la entidad).mjs"
    2.1 Importas pool
    2.2 Creas una clase (para exportar 'export' al principio) llamada 'obtener(nombre de la entidad con camel case)'
    2.3 Dentro de la clase creas una función, del mismo nombre, y le pones async.
    2.4 Creas una constante para guardar una consulta SQL (un SELECT * FROM tabla)
    2.5 Configuras el catch
    2.6 Algo así:

    import {pool} from '../config/db.mjs';

    export class obtenerEntidad{
        async obtenerEntidad(req, res){
            try {
                const resultado = await pool.query('SELECT * FROM entidad');
                return resultado.rows;
            }catch (error) {
                console.error('Error al obtener entidad:', error);
                throw error;
            }
        }
    }

    Reemplazas "Entidad" por lo que estás haciendo.

3. En './controllers'  creas un archivo "controlador(nombre de la entidad).mjs"
    3.1 Importas la función que creaste en el paso anterior
    3.2 La llamas en una nueva constante ('repo')
    3.3 Creas una clase llamada controlador(nombre)
    3.4 Dentro de la clase, de manera asincrona, creas una función del mismo nombre
    3.5 Seguimos con la estructura try & catch
    3.6 En el try creas una constante donde guardar los datos de la entidad, le asignas la constante repo, donde llamas a la funcion 'obtener' (paso 3.2), y por último la devolves en un .JSON
    3.7 Configuras el catch
    3.8 Algo así:

    import {obtenerEntidad} from '../repositories/dbEntidad.mjs'

    const repo = new obtenerEntidad()

    export class controladorEntidad{
        async getEntidad(req, res){
            try {
                const entidades = await repo.obtenerEntidad();
                res.json(entidades);
            } catch (error) {
                console.error('Error al obtener entidades:', error);
                res.status(500).json({ error: 'Error al obtener entidades' });
            }
        } 
    }

4. En './routes' creas un archivo llamado 'ruta(nombre de la entidad con camel case).mjs'
    4.1 Importas Router (IMPORTANTÍSIMO)
    4.2 Importas la función que creaste en el paso anterior
    4.3 Creas una constante router y le asignas... Router().
    4.4 Creas una constante controlador y le asignas la función que creaste en el paso anterior
    4.5 Al router le configuras el get, le pasas los dos parametros que son:
        4.5.1 '/nombreEntidad' (por ejemplo, '/profesores')
        4.5.2 'controlador.getEntidad', qué es la función que creaste antes
        4.5.3 Entonces, traducido, cuando entremos a '/nombreEntidad' se ejecutará 'controlador.getEntidad' y podremos ver todos los datos que haya (esto es solo un GET común)
    4.6 Exportas, de manera no nombrada, la constante router
    4.7 Algo así:

    import {Router} from 'express'; 

    import {controladorEntidades} from '../controllers/controladorEntidades.mjs';

    const router = Router();

    const controlador = new controladorEntidad();

    router.get('/entidades', controlador.getEntidades);

    export default router;

5. En '/index.mjs' vas a tener dos lugares (que las comente), una en donde importamos las rutas, y otra donde las usamos
    5.1 En el primer lugar vas a importarla así:

        import (nombre del archivo .mjs de la ruta de la entidad) from (ruta)

        Por ejemplo:

        import rutaEntidades from './src/routes/rutaEntidades.mjs';

    5.2 En el segundo lugar vas a usarla así (le pasas los dos parametros, '/api', y lo que importaste en el paso anterior):

        app.use('/api', ruta)
        
        Por ejemplo:

        app.use('/api', rutaProfesores);  

Este último paso permite que, los primeros cuatro pasos, tengan sentido. Una vez ingresemos a './api/entidades' se cargará todo lo que hiciste y derivará en qué, puedas ver, como un .JSON, la consulta SQL.