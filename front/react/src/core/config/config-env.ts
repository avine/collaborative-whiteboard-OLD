import { ConfigEnv } from './config.types';

const configEnv: ConfigEnv = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL
};

export default configEnv;
