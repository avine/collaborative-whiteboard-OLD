import axios from 'axios';

import {
  UserProfile,
  UserToken
} from '../../../../back/src/router/user/user.types';
import { getConfig } from '../core/config';
import { getToken } from './token';

const axiosInstance = axios.create({
  baseURL: getConfig('apiBaseUrl'),
  headers: { Accept: 'application/json' }
});

const getHeaderToken = () => ({ Authorization: `Bearer ${getToken()}` });

export const getUserProfile = () =>
  axiosInstance.get<UserProfile>(`user/profile`, {
    headers: getHeaderToken()
  });

export const getUserToken = () =>
  axiosInstance.get<UserToken>(`user/token`, {
    headers: getHeaderToken()
  });
