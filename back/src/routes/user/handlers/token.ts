import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import { signData, verifyToken } from '../../../common/jwt';

const tokenHandler: RequestHandler = async (req, res) => {
  const { token } = req.body;

  try {
    const data: any = await verifyToken(token);

    delete data.iat;
    delete data.exp;

    res.send(await signData(data));
  } catch (err) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
  }
};

export default tokenHandler;
