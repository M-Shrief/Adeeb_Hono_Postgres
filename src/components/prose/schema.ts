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
import { idSchema } from '../../utils/schemas';
  
export const createSchema = object({
    poet: idSchema,
    tags: pipe(string(), trim(), minLength(4), maxLength(50)),
    qoute: pipe(string(), trim(), minLength(4), maxLength(500)),
    reviewed: boolean()
})

export const updateSchema = object({
    poet: optional(idSchema),
    tags: optional(pipe(string(), trim(), minLength(4), maxLength(50))),
    qoute: optional(pipe(string(), trim(), minLength(4), maxLength(500))),
    reviewed: optional(boolean())
})