import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

import rutaEntrenamientos from './src/routes/rutaEntrenamientos.mjs'
import rutaTestimonios from './src/routes/rutaTestimonios.mjs'
import rutaSuscripciones from './src/routes/rutaSuscripciones.mjs'
import rutaClasesProgramadas from './src/routes/rutaClasesProgramadas.mjs'
import rutaEstados from './src/routes/rutaEstados.mjs'
import rutaInscripciones from './src/routes/rutaInscripciones.mjs'
import rutaPerfiles from './src/routes/rutaPerfiles.mjs'
import rutaProfesores from './src/routes/rutaProfesores.mjs'
import rutaReservas from './src/routes/rutaReservas.mjs'
import rutaRoles from './src/routes/rutaRoles.mjs'
import rutaUsuarios from './src/routes/rutaUsuarios.mjs';
import rutaDashboardUsuario from "./src/routes/rutaDashboardUsuario.mjs";

const puerto = 3000;

const app = express();

app.use(express.static(path.resolve('..', 'frontend')))
app.use(express.json());
app.use(cookieParser());

app.use('/api', rutaEntrenamientos)
app.use('/api', rutaTestimonios)
app.use('/api', rutaSuscripciones)
app.use('/api', rutaClasesProgramadas)
app.use('/api', rutaInscripciones)
app.use('/api', rutaPerfiles)
app.use('/api', rutaProfesores)
app.use('/api', rutaReservas)
app.use('/api', rutaRoles)
app.use('/api', rutaEstados)
app.use('/api', rutaUsuarios)
app.use('/api', rutaDashboardUsuario)

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});