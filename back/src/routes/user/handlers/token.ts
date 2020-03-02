import { RequestHandler } from 'express';

import { signData } from '../../../common/jwt';

const tokenHandler: RequestHandler = async (req, res) => {
  const { tokenData } = req;

  delete tokenData.iat;
  delete tokenData.exp;

  res.send(await signData(tokenData));
};

export default tokenHandler;
