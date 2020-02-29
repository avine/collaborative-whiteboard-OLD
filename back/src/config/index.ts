import configEnv from './config.env';
import configSchema from './config.schema';
import { Config } from './config.types';
import { getConfigFactory, getValidatedConfig } from './config.utils';

const config = getValidatedConfig(configSchema, configEnv);

export const getAllConfig = (): Config => ({ ...config });

export const getConfig = getConfigFactory(config);
