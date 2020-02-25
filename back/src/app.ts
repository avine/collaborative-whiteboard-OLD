import timeout from 'connect-timeout';
import express from 'express';

import { accessLogger, consoleLogger } from './log';
import dbRoutes from './routes/db.route';
import { errorHandler, errorLogger } from './routes/error.route';
import staticRoutes from './routes/static.route';

const app = express();

app.use(consoleLogger);
app.use(accessLogger);

app.use(timeout('5s'));

app.use(staticRoutes);
app.use(dbRoutes);

app.use(errorLogger);
app.use(errorHandler);

export default app;
