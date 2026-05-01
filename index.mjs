import express from 'express';

import path from 'node:path';

const puerto = 3000;

const app = express();

app.use(express.static(path.resolve('recursos')));

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});