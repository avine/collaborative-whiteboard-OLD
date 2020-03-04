import { ErrorRequestHandler } from 'express';

export const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('errorLogger', err.stack);
  next(err);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500);
  if (req.xhr) {
    res.send({ error: err.message });
  } else {
    res.send(err.message);
  }
};
