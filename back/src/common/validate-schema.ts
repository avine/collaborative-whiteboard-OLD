import Ajv from 'ajv';

// eslint-disable-next-line import/prefer-default-export
export const validateSchema = (schema: Object, data: any) => {
  const ajv = new Ajv({ coerceTypes: true, allErrors: true });
  if (!ajv.validate(schema, data)) {
    return ajv.errors || undefined;
  }
  return undefined;
};
