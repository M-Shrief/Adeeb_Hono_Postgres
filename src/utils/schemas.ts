import { length, object, pipe, string } from 'valibot';

export const idSchema = pipe(string(), length(24));
