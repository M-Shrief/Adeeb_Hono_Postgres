import { vValidator } from '@hono/valibot-validator';
import { flatten, object } from 'valibot';
// Utils
import { idSchema } from './schemas';
import HttpStatusCode from './httpStatusCode';

export const jsonValidator = (schema: any) => {
  return vValidator('json', schema, (result, c) => {
    if (!result.success) {
      return c.json(
        { success: result.success, errors: flatten(result.issues).nested },
        HttpStatusCode.NOT_ACCEPTABLE,
      );
    }
  });
};

export const paramValidator = (schema: any) =>
  vValidator('param', schema, (result, c) => {
    if (!result.success) {
      return c.json(
        { success: result.success, errors: flatten(result.issues).nested },
        HttpStatusCode.NOT_ACCEPTABLE,
      );
    }
});

export const idParamValidator = () => paramValidator(object({ id: idSchema }))
