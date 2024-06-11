import { array, boolean, fallback, length, maxLength, minLength, object, pipe, string, trim } from 'valibot';

export const nameSchema = pipe(string(), trim(), minLength(4), maxLength(50));

export const idSchema = pipe(string(), length(24));

export const versesSchema = array(
  object({
    first: pipe(string(), trim(), minLength(4), maxLength(50)),
    sec: pipe(string(), trim(), minLength(4), maxLength(50))
  }
))

export const tagsSchema = pipe(string(), trim(), minLength(4), maxLength(50));

export const reviewedSchema = fallback(boolean(), false);
