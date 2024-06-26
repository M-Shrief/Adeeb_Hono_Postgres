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
import { uuidSchema, reviewedSchema, tagsSchema } from '../../utils/schemas';

export const qouteSchema = pipe(string(), trim(), minLength(4), maxLength(500));

export const createSchema = object({
  poet: uuidSchema,
  tags: tagsSchema,
  qoute: qouteSchema,
  reviewed: reviewedSchema,
});

export const updateSchema = object({
  poet: optional(uuidSchema),
  tags: optional(tagsSchema),
  qoute: optional(qouteSchema),
  reviewed: optional(reviewedSchema),
});
