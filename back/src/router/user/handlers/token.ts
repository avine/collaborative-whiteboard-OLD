import { RequestHandler } from 'express';

import { signToken } from '../../../core/common/jwt';
import { getConfig } from '../../../core/config';
import { UserToken } from '../user.types';

const tokenHandler: RequestHandler = async (req, res) => {
  const { tokenDecoded } = req;

  const expiresIn = getConfig('jwtExpiresIn');
  tokenDecoded.exp += expiresIn;

  const token = await signToken(tokenDecoded);
  const userToken: UserToken = { token, expiresIn };
  res.send(userToken);
};

export default tokenHandler;
