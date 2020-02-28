// eslint-disable-next-line import/prefer-default-export
export const userLoginSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' }
  },
  required: ['email', 'password']
};
