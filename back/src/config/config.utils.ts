import Ajv from 'ajv';
import { readFileSync } from 'fs';
import { join } from 'path';

import { Config, ConfigEnv } from './config.types';

export const getConfigSchema = (): JSON => {
  const content = readFileSync(join(__dirname, './config.schema.json'), {
    encoding: 'utf8'
  });
  return JSON.parse(content);
};

export const getValidatedConfig = (schema: JSON, config: ConfigEnv): Config => {
  const _config = { ...config } as any;
  const validate = new Ajv({ coerceTypes: true }).compile(schema);
  const valid = validate(_config);
  if (!valid) {
    console.error(validate.errors);
    throw new Error('Unable to get validated app config');
  }
  return _config as Config;
};

export const getConfigFactory = (config: Config) => <T = any>(
  key: keyof Config
) => (config[key] as any) as T;
