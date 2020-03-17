// eslint-disable-next-line import/no-extraneous-dependencies
import { JSONSchema7, JSONSchema7Definition } from 'json-schema';

import { ConfigDynamic } from './config.types';

const properties: Record<keyof ConfigDynamic, JSONSchema7Definition> = {
  serverPort: { type: 'integer' },
  dbUri: { type: 'string' },
  dbName: { type: 'string' },
  jwtSecret: { type: 'string' },
  originBaseUrl: { type: 'string' }
};

const required: Array<keyof ConfigDynamic> = [
  'serverPort',
  'dbUri',
  'dbName',
  'jwtSecret',
  'originBaseUrl'
];

const configEnvSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema',
  type: 'object',
  properties,
  required
};

export default configEnvSchema;
