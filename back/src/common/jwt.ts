import { sign, verify } from 'jsonwebtoken';
import { getConfig } from '../config';

const secret = getConfig('jwtSecret');

export const signData = (data: string | object, expiresIn: string | number) =>
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
  new Promise((resolve, reject) => {
    verify(token, secret, {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
