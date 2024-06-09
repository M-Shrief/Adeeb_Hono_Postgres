import mongoose from 'mongoose';
// Component
import { ProseType } from './interface';
const Schema = mongoose.Schema;

const proseShema = new Schema(
  {
    poet: {
      type: Schema.Types.ObjectId,
      ref: 'Poet',
      required: true,
    },
    tags: {
      type: String,
      required: true,
      length: { minlength: 4, maxlength: 50 },
    },
    qoute: {
      type: String,
      required: true,
      length: { minlength: 4, maxlength: 300 },
    },
    reviewed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Prose = mongoose.model<ProseType>('Prose', proseShema);
