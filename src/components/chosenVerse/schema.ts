import { optional, object } from 'valibot';
// Utils
import {
  uuidSchema,
  versesSchema,
  tagsSchema,
  reviewedSchema,
} from '../../utils/schemas';

export const createSchema = object({
  poet: uuidSchema,
  poem: uuidSchema,
  verses: versesSchema,
  tags: tagsSchema,
  reviewed: reviewedSchema,
});

export const updateSchema = object({
  poet: optional(uuidSchema),
  poem: optional(uuidSchema),
  verses: optional(versesSchema),
  tags: optional(tagsSchema),
  reviewed: optional(reviewedSchema),
});
