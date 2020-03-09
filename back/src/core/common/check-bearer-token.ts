import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import { verifyToken } from './jwt';

declare global {
  namespace Express {
    interface Request {
      tokenDecoded?: any;
      userId?: string;
    }
  }
}

const checkBearerToken: RequestHandler = async (req, res, next) => {
  if (!req.token) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
    return;
  }
  try {
    req.tokenDecoded = await verifyToken(req.token);
    req.userId = req.tokenDecoded.sub; // userId is the token's subject alias
    next();
  } catch (err) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
  }
};

export default checkBearerToken;
