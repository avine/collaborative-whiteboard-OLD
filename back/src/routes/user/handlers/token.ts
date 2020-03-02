import { RequestHandler } from 'express';

import { signData, verifyToken } from '../../../common/jwt';

const tokenHandler: RequestHandler = async (req, res) => {
  const data: any = await verifyToken(req.token as string);

  delete data.iat;
  delete data.exp;

  res.send(await signData(data));
};

export default tokenHandler;
