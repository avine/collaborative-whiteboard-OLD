// eslint-disable-next-line import/no-extraneous-dependencies
import { JSONSchema7 } from 'json-schema';

// eslint-disable-next-line import/prefer-default-export
export const userLoginSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema',
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 }
  },
  required: ['email', 'password']
};
