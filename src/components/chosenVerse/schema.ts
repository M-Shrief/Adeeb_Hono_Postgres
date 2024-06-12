import {
    optional,
    object,
  } from 'valibot';
// Utils
import { mongoIdSchema, versesSchema, tagsSchema, reviewedSchema } from '../../utils/schemas';
  

export const createSchema = object({
    poet: mongoIdSchema,
    poem: mongoIdSchema,
    verses: versesSchema,
    tags: tagsSchema,
    reviewed: reviewedSchema,
})

export const updateSchema = object({
    poet: optional(mongoIdSchema),
    poem: optional(mongoIdSchema),
    verses: optional(versesSchema),
    tags: optional(tagsSchema),
    reviewed: optional(reviewedSchema)
})