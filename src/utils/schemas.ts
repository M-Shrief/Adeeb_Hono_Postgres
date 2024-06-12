import { isValidObjectId } from 'mongoose';
import { array, boolean, custom, fallback, maxLength, minLength, object, pipe, string, trim } from 'valibot';

export const nameSchema = pipe(string(), trim(), minLength(4), maxLength(50));

export const mongoIdSchema = custom<string, "Not a valid Mongo ID">((input) => isValidObjectId(input) ? true : false, "Not a valid Mongo ID")

export const versesSchema = array(
  object({
    first: pipe(string(), trim(), minLength(4), maxLength(50)),
    sec: pipe(string(), trim(), minLength(4), maxLength(50))
  }
))

export const tagsSchema = pipe(string(), trim(), minLength(4), maxLength(50));

export const reviewedSchema = fallback(boolean(), false);
