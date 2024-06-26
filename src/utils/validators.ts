import { vValidator } from '@hono/valibot-validator';
import { flatten, object } from 'valibot';
// Utils
import { uuidSchema } from './schemas';
import HttpStatusCode from './httpStatusCode';

export const jsonValidator = (schema: any, message?: string) => {
  return vValidator('json', schema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: message ?? 'JSON validation error',
          errors: flatten(result.issues).nested,
        },
        HttpStatusCode.NOT_ACCEPTABLE,
      );
    }
  });
};

export const paramValidator = (schema: any, message?: string) =>
  vValidator('param', schema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: message ?? 'param validation error',
          errors: flatten(result.issues).nested,
        },
        HttpStatusCode.NOT_ACCEPTABLE,
      );
    }
  });

export const idParamValidator = () =>
  paramValidator(object({ id: uuidSchema }), 'Not Found');
