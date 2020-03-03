import { RequestHandler } from 'express';

import { signToken } from '../../../core/common/jwt';
import { getConfig } from '../../../core/config';

const tokenHandler: RequestHandler = async (req, res) => {
  const { tokenDecoded } = req;

  tokenDecoded.exp += getConfig('jwtExpiresIn');

  const token = await signToken(tokenDecoded);
  const expiresIn = getConfig('jwtExpiresIn');
  res.send({ token, expiresIn });
};

export default tokenHandler;
