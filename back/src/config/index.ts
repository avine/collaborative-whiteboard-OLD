import configEnv from './config.env';
import { Config } from './config.types';
import {
  getConfigFactory,
  getConfigSchema,
  getValidatedConfig
} from './config.utils';

const configSchema = getConfigSchema();
const config = getValidatedConfig(configSchema, configEnv);

export const getAllConfig = (): Config => ({ ...config });

export const getConfig = getConfigFactory(config);
