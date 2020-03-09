import validateSchema from '../common/validate-schema';
import configEnv from './config-env';
import configEnvSchema from './config-env.schema';
import configStatic from './config-static';
import { Config, ConfigDynamic } from './config.types';
import { getConfigFactory } from './config.utils';

const configDynamic: ConfigDynamic = { ...configEnv } as any;
const schemaErrors = validateSchema(configEnvSchema, configDynamic);
if (schemaErrors) {
  console.error('Invalid config', schemaErrors);
}

export const getAllConfig = (): Config => ({
  ...configDynamic,
  ...configStatic
});

export const getConfig = getConfigFactory(getAllConfig());
