// eslint-disable-next-line import/no-extraneous-dependencies
import { JSONSchema7 } from 'json-schema';

// eslint-disable-next-line import/prefer-default-export
export const whiteboardAddSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema',
  type: 'object',
  properties: {
    title: { type: 'string', pattern: '^[^><]+$', minLength: 3 }
  },
  required: ['title']
};
