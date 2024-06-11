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
import { idSchema, versesSchema, tagsSchema, reviewedSchema } from '../../utils/schemas';
  

export const createSchema = object({
    poet: idSchema,
    poem: idSchema,
    verses: versesSchema,
    tags: tagsSchema,
    reviewed: reviewedSchema,
})

export const updateSchema = object({
    poet: optional(idSchema),
    poem: optional(idSchema),
    verses: optional(versesSchema),
    tags: optional(tagsSchema),
    reviewed: optional(reviewedSchema)
})