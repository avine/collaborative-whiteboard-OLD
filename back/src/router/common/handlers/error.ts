import { ErrorRequestHandler } from 'express';

export const errorServerHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  // eslint-disable-next-line no-console
  console.error('errorConsoleHandler', err.stack);
  next(err);
};

export const errorClientHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  res.status(500);
  if (req.xhr) {
    res.send({ error: err.message });
  } else {
    res.send(err.message);
  }
};
