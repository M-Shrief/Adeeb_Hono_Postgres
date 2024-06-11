import {
  pipe,
  optional,
  object,
  string,
  trim,
  maxLength,
  minLength,
  boolean,
} from 'valibot';
// Utils
import { idSchema, reviewedSchema, versesSchema} from '../../utils/schemas';

const introSchema = pipe(string(), trim(), minLength(4), maxLength(50));

export const createSchema = object({
  intro: introSchema,
  poet: idSchema,
  verses: versesSchema,
  reviewed: reviewedSchema,
})

export const updateSchema = object({
  intro: optional(introSchema),
  poet: optional(idSchema),
  verses: optional(versesSchema),
  reviewed: optional(reviewedSchema),
})