import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import { verifyToken } from './jwt';

declare global {
  namespace Express {
    interface Request {
      tokenData?: any;
    }
  }
}

const checkBearerToken: RequestHandler = async (req, res, next) => {
  if (!req.token) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
    return;
  }
  try {
    req.tokenData = await verifyToken(req.token);
    next();
  } catch (err) {
    next(err);
  }
};

export default checkBearerToken;
