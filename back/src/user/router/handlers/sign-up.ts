import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import { hashPassword } from '../../../core/common/hash-password';
import { signUserToken } from '../../../core/common/jwt';
import validateSchema from '../../../core/common/validate-schema';
import { getConfig } from '../../../core/config';
import { getDefaultDb } from '../../../core/db';
import { insertUser } from '../../db';
import { User, UserLogin } from '../../db/user.types';
import { userLoginSchema } from '../user.schemas';

const signUpHandler: RequestHandler = async (req, res) => {
  const userLogin: UserLogin = req.body;
  const errors = validateSchema(userLoginSchema, userLogin);
  if (errors) {
    res.sendStatus(HttpStatus.BAD_REQUEST);
    return;
  }

  const db = await getDefaultDb();
  const users = db.collection<User>('users');

  const exists = await users.findOne({ email: userLogin.email });
  if (exists) {
    res.sendStatus(HttpStatus.FORBIDDEN);
    return;
  }

  const hash = await hashPassword(userLogin.password);
  const insert = await insertUser(userLogin.email, hash);
  if (insert.insertedCount) {
    res.status(HttpStatus.CREATED);

    const token = await signUserToken(insert.insertedId.toHexString());
    const expiresIn = getConfig('jwtExpiresIn');
    res.send({ token, expiresIn });
    return;
  }

  res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
};

export default signUpHandler;
