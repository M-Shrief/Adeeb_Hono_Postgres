import { length, maxLength, minLength, object, pipe, string, trim } from 'valibot';

export const idSchema = pipe(string(), length(24));

export const versesSchema = object({
    first: pipe(string(), trim(), minLength(4), maxLength(50)),
    sec: pipe(string(), trim(), minLength(4), maxLength(50))
  })