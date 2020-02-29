const configEnvSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  type: 'object',
  properties: {
    serverPort: { type: 'integer' },
    dbUri: { type: 'string' },
    dbName: { type: 'string' },
    jwtSecret: { type: 'string' }
  },
  required: ['serverPort', 'dbUri', 'dbName', 'jwtSecret']
};

export default configEnvSchema;
