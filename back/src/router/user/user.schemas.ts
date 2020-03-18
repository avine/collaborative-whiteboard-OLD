// eslint-disable-next-line import/no-extraneous-dependencies
import { JSONSchema7, JSONSchema7Definition } from 'json-schema';

import { UserLogin } from './user.types';

const properties: Record<keyof UserLogin, JSONSchema7Definition> = {
  email: { type: 'string', format: 'email' },
  password: { type: 'string', minLength: 8 }
};

const required: Array<keyof UserLogin> = ['email', 'password'];

// eslint-disable-next-line import/prefer-default-export
export const userLoginSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema',
  type: 'object',
  properties,
  required
};
