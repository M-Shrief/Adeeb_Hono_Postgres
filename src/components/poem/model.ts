import mongoose from 'mongoose';
// Types
import { PoemType } from './interface';
import { VerseType } from '../../utils/types';

const Schema = mongoose.Schema;

const poemSchema = new Schema(
  {
    intro: {
      type: String,
      required: true,
      length: { minlength: 4, maxlength: 50 },
    },
    poet: { type: Schema.Types.ObjectId, ref: 'Poet', required: true },
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

export const Poem = mongoose.model<PoemType>('Poem', poemSchema);
