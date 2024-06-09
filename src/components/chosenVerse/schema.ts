import {
    pipe,
    optional,
    picklist,
    object,
    string,
    trim,
    maxLength,
    minLength,
    boolean,
  } from 'valibot';
// Utils
import { idSchema, versesSchema } from '../../utils/schemas';
  

export const createSchema = object({
    poet: idSchema,
    poem: idSchema,
    verses: versesSchema,
    tags: pipe(string(), trim(), minLength(4), maxLength(50)),
    reviewed: boolean()
})

export const updateSchema = object({
    poet: optional(idSchema),
    poem: optional(idSchema),
    verses: optional(versesSchema),
    tags: optional(pipe(string(), trim(), minLength(4), maxLength(50))),
    reviewed: optional(boolean())
})