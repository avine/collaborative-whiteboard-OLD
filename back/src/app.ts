import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import express from 'express';
import bearerToken from 'express-bearer-token';

import { accessLogger, consoleLogger } from './core/log';
import {
  errorClientHandler,
  errorServerHandler
} from './router/common/handlers/error';
import dbRouter from './router/db';
import publicRouter from './router/public';
import userRouter from './router/user';
import whiteboardRouter from './router/whiteboard';

const app = express();

app.use(bearerToken());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(consoleLogger);
app.use(accessLogger);

app.use(timeout('5s'));

app.use(dbRouter);
app.use(userRouter);
app.use(whiteboardRouter);
app.use(publicRouter);

app.use(errorServerHandler);
app.use(errorClientHandler);

export default app;
