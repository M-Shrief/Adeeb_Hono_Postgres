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
import { idSchema, versesSchema} from '../../utils/schemas';

export const createSchema = object({
  intro: pipe(string(), trim(), minLength(4), maxLength(50)),
  poet: idSchema,
  verses: versesSchema,
  reviewed: boolean(),
})

export const updateSchema = object({
  intro: optional(pipe(string(), trim(), minLength(4), maxLength(50))),
  poet: optional(idSchema),
  verses: optional(versesSchema),
  reviewed: optional(boolean()),
})