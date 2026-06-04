import express from 'express';

import path from 'node:path';

//Lugar para importar las rutas
import rutaProfesores from './src/routes/rutaProfesores.mjs';
import rutaUsuarios from './src/routes/rutaUsuarios.mjs';
import rutaTestimonios from './src/routes/rutaTestimonios.mjs';
import rutaInscripciones from './src/routes/rutaInscripciones.mjs';
import rutaRoles from './src/routes/rutaRoles.mjs';
import rutaEntrenamientos from './src/routes/rutaEntrenamientos.mjs';
import rutaPerfiles from './src/routes/rutaPerfiles.mjs';
import rutaClasesProgramadas from './src/routes/rutaClasesProgramadas.mjs';
import rutaEstados from './src/routes/rutaEstados.mjs';
import rutaSuscripciones from './src/routes/rutaSuscripciones.mjs';
import rutaReservas from './src/routes/rutaReservas.mjs';

const puerto = 3000;

const app = express();

app.use(express.static(path.resolve('..', 'frontend')));

//Lugar para usar las rutas
app.use('/api', rutaProfesores);
app.use('/api', rutaUsuarios);
app.use('/api', rutaTestimonios);
app.use('/api', rutaInscripciones);
app.use('/api', rutaRoles);
app.use('/api', rutaEntrenamientos);
app.use('/api', rutaPerfiles);
app.use('/api', rutaClasesProgramadas);
app.use('/api', rutaEstados);
app.use('/api', rutaSuscripciones);
app.use('/api', rutaReservas);

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});