import axios from 'axios';

import { DrawEvent, DrawTransport } from '../collaborative-whiteboard/models';
import { getConfig } from '../core/config';
import { Whiteboard } from '../shared/collaborative-whiteboard.types';
import { getToken } from './token';

const axiosInstance = axios.create({
  baseURL: getConfig('apiBaseUrl'),
  headers: { Accept: 'application/json' }
});

const getHeaderToken = () => ({ Authorization: `Bearer ${getToken()}` });

export const getWhiteboard = (id: string) =>
  axiosInstance.get<Whiteboard>(`whiteboard/${id}`, {
    headers: getHeaderToken()
  });

export const setWhiteboard = (id: string, history: DrawEvent[]) =>
  axiosInstance.put(`whiteboard/${id}`, history, {
    headers: getHeaderToken()
  });

export const updateWhiteboard = (id: string, transport: DrawTransport) =>
  axiosInstance.patch(`whiteboard/${id}`, transport, {
    headers: getHeaderToken()
  });
