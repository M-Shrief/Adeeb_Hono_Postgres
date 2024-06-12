import {
  pipe,
  optional,
  object,
  string,
  trim,
  maxLength,
  minLength,
} from 'valibot';
// Utils
import { mongoIdSchema, reviewedSchema, tagsSchema } from '../../utils/schemas';

export const qouteSchema = pipe(string(), trim(), minLength(4), maxLength(500));

export const createSchema = object({
  poet: mongoIdSchema,
  tags: tagsSchema,
  qoute: qouteSchema,
  reviewed: reviewedSchema,
});

export const updateSchema = object({
  poet: optional(mongoIdSchema),
  tags: optional(tagsSchema),
  qoute: optional(qouteSchema),
  reviewed: optional(reviewedSchema),
});
