import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import express from 'express';

import { accessLogger, consoleLogger } from './log';
import dbRoutes from './routes/db.routes';
import { errorHandler, errorLogger } from './routes/error.routes';
import staticRoutes from './routes/static.routes';
import userRoutes from './routes/user/user.routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(consoleLogger);
app.use(accessLogger);

app.use(timeout('5s'));

app.use(staticRoutes);
app.use(userRoutes);
app.use(dbRoutes);

app.use(errorLogger);
app.use(errorHandler);

export default app;
