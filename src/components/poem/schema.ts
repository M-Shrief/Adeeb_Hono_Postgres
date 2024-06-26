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
import {
  uuidSchema,
  reviewedSchema,
  versesSchema,
} from '../../utils/schemas';

const introSchema = pipe(string(), trim(), minLength(4), maxLength(50));

export const createSchema = object({
  intro: introSchema,
  poet: uuidSchema,
  verses: versesSchema,
  reviewed: reviewedSchema,
});

export const updateSchema = object({
  intro: optional(introSchema),
  poet: optional(uuidSchema),
  verses: optional(versesSchema),
  reviewed: optional(reviewedSchema),
});
