import { RequestHandler } from 'express';

import { signToken } from '../../../core/common/jwt';
import { getConfig } from '../../../core/config';

const tokenHandler: RequestHandler = async (req, res) => {
  const { tokenDecoded } = req;

  const expiresIn = getConfig('jwtExpiresIn');
  tokenDecoded.exp += expiresIn;

  const token = await signToken(tokenDecoded);
  res.send({ token, expiresIn });
};

export default tokenHandler;
