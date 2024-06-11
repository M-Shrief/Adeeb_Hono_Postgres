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
import { idSchema, reviewedSchema, tagsSchema } from '../../utils/schemas';
  
export const qouteSchema = pipe(string(), trim(), minLength(4), maxLength(500));

export const createSchema = object({
    poet: idSchema,
    tags: tagsSchema,
    qoute: qouteSchema,
    reviewed: reviewedSchema
})

export const updateSchema = object({
    poet: optional(idSchema),
    tags: optional(tagsSchema),
    qoute: optional(qouteSchema),
    reviewed: optional(reviewedSchema)
})