import { decode, sign, verify } from 'jsonwebtoken';

import { getConfig } from '../config';

const jwtSecret = getConfig('jwtSecret');
const jwtExpiresIn = getConfig('jwtExpiresIn');

export const signData = (
  data: string | object,
  expiresIn: string | number = jwtExpiresIn
) =>
  new Promise<string>((resolve, reject) => {
    sign(data, jwtSecret, { expiresIn }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

export const verifyToken = (token: string) =>
  new Promise<string | object>((resolve, reject) => {
    verify(token, jwtSecret, {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

export const decodeToken = (token: string) => decode(token, { complete: true });
