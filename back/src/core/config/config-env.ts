import { ConfigEnv } from './config.types';

const configEnv: ConfigEnv = {
  serverPort: process.env.SERVER_PORT,
  dbUri: process.env.DB_URI,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  originBaseUrl: process.env.ORIGIN_BASE_URL
};

export default configEnv;
