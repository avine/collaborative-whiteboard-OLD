import { decode, sign, verify } from 'jsonwebtoken';

import { getConfig } from '../config';
import { JWT_EXPIRES_IN } from '../config/config.static';

const secret = getConfig('jwtSecret');

export const signData = (
  data: string | object,
  expiresIn: string | number = JWT_EXPIRES_IN
) =>
  new Promise<string>((resolve, reject) => {
    sign(data, secret, { expiresIn }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

export const verifyToken = (token: string) =>
  new Promise<string | object>((resolve, reject) => {
    verify(token, secret, {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

export const decodeToken = (token: string) => decode(token, { complete: true });
