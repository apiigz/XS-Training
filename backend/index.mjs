import express from 'express';

import path from 'node:path';

import rutaProfesores from './src/routes/rutaProfesores.mjs';

const puerto = 3000;

const app = express();

app.use(express.static(path.resolve('..', 'frontend')));

app.use('/api', rutaProfesores);

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});