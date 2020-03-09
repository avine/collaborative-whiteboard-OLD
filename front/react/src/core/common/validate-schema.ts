import Ajv from 'ajv';

const validateSchema = (schema: Object, data: any) => {
  const ajv = new Ajv({ coerceTypes: true, allErrors: true });
  if (!ajv.validate(schema, data)) {
    return ajv.errors || undefined;
  }
  return undefined;
};

export default validateSchema;
