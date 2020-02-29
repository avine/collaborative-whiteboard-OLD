import Ajv from 'ajv';

import { Config, ConfigEnv } from './config.types';

export const getValidatedConfig = (
  schema: Object,
  config: ConfigEnv
): Config => {
  const configCopy = { ...config } as any;
  const validate = new Ajv({ coerceTypes: true }).compile(schema);
  const valid = validate(configCopy);
  if (!valid) {
    // console.error(validate.errors);
    throw new Error('Unable to get validated app config');
  }
  return configCopy as Config;
};

export const getConfigFactory = (config: Config) => <T = any>(
  key: keyof Config
) => (config[key] as any) as T;
