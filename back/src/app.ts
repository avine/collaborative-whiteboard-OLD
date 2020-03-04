import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import express from 'express';
import bearerToken from 'express-bearer-token';

import { accessLogger, consoleLogger } from './core/log';
import dbRouter from './router/db.router';
import { errorHandler, errorLogger } from './router/handlers/error';
import publicRouter from './router/public.router';
import userRouter from './user/router';
import whiteboardRouter from './whiteboard/router';

const app = express();

app.use(bearerToken());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(consoleLogger);
app.use(accessLogger);

app.use(timeout('5s'));

app.use(publicRouter);
app.use(dbRouter);
app.use(userRouter);
app.use(whiteboardRouter);

app.use(errorLogger);
app.use(errorHandler);

export default app;
