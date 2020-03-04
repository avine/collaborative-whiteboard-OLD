import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import { comparePassword } from '../../../core/common/hash-password';
import { signUserToken } from '../../../core/common/jwt';
import validateSchema from '../../../core/common/validate-schema';
import { getConfig } from '../../../core/config';
import { findUserByEmail, updateUserSignInDate } from '../../db';
import { UserLogin } from '../../db/user.types';
import { userLoginSchema } from '../user.schemas';

const signInHandler: RequestHandler = async (req, res) => {
  const userLogin: UserLogin = req.body;
  const errors = validateSchema(userLoginSchema, userLogin);
  if (errors) {
    res.sendStatus(HttpStatus.BAD_REQUEST);
    return;
  }

  const user = await findUserByEmail(userLogin.email);
  if (!user || !(await comparePassword(userLogin.password, user.password))) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
    return;
  }

  await updateUserSignInDate(user._id);

  const token = await signUserToken(user._id.toHexString());
  const expiresIn = getConfig('jwtExpiresIn');
  res.send({ token, expiresIn });
};

export default signInHandler;
