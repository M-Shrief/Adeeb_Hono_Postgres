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
import { mongoIdSchema, reviewedSchema, versesSchema} from '../../utils/schemas';

const introSchema = pipe(string(), trim(), minLength(4), maxLength(50));

export const createSchema = object({
  intro: introSchema,
  poet: mongoIdSchema,
  verses: versesSchema,
  reviewed: reviewedSchema,
})

export const updateSchema = object({
  intro: optional(introSchema),
  poet: optional(mongoIdSchema),
  verses: optional(versesSchema),
  reviewed: optional(reviewedSchema),
})