import express from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import morgan from 'morgan';

import timeout from 'connect-timeout';

import { ROOT_PATH } from './path';

import staticRoutes from './routes/static';
import dbRoutes from './routes/db';

const app = express();

app.use(morgan('dev'));

app.use(timeout('5s'));
app.use(staticRoutes);
app.use(dbRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  next(err);
});

app.use((err: any, req: any, res: any, next: any) => {
  res.status(500);
  if (req.xhr) {
    res.send({ error: err.message });
  } else {
    res.send(err.message);
  }
});

// const indexPath = resolve(ROOT_PATH, 'static', 'index.html');
// const indexContent = readFileSync(indexPath, { encoding: 'utf8' });
// app.use((req, res, next) => res.send(indexContent));

export default app;
