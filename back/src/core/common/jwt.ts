import { decode, sign, SignOptions, verify } from 'jsonwebtoken';

import { getConfig } from '../config';

const jwtSecret = getConfig('jwtSecret');
const jwtExpiresIn = getConfig('jwtExpiresIn');

export const signToken = (payload: object, options: SignOptions = {}) =>
  new Promise<string>((resolve, reject) => {
    sign(payload, jwtSecret, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

export const verifyToken = (token: string) =>
  new Promise<string | object>((resolve, reject) => {
    verify(token, jwtSecret, {}, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

export const signUserToken = (userId: string) =>
  signToken({}, { subject: userId, expiresIn: jwtExpiresIn });

export const decodeToken = (token: string) => decode(token, { complete: true });
