import mongoose from 'mongoose';

import { ChosenVerseType } from './interface';
// utils
import { VerseType } from '../../utils/types';

const Schema = mongoose.Schema;

const ChosenVerseSchema = new Schema(
  {
    poet: {
      type: Schema.Types.ObjectId,
      ref: 'Poet',
      required: true,
    },
    poem: {
      type: Schema.Types.ObjectId,
      ref: 'Poem',
      required: true,
    },
    tags: {
      type: String,
      required: true,
      length: { minlength: 4, maxlength: 50 },
    },
    verses: {
      type: [] as VerseType[],
      required: true,
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const ChosenVerse = mongoose.model<ChosenVerseType>(
  'ChosenVerse',
  ChosenVerseSchema,
);
