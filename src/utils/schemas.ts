import {
  array,
  boolean,
  fallback,
  maxLength,
  minLength,
  object,
  pipe,
  string,
  trim,
  uuid
} from 'valibot';

export const nameSchema = pipe(string(), trim(), minLength(4), maxLength(50));


export const uuidSchema = pipe(string(), uuid());


export const versesSchema = array(
  object({
    first: pipe(string(), trim(), minLength(4), maxLength(50)),
    sec: pipe(string(), trim(), minLength(4), maxLength(50)),
  }),
);

export const tagsSchema = pipe(string(), trim(), minLength(4), maxLength(50));

export const reviewedSchema = fallback(boolean(), false);
