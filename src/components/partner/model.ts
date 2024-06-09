import mongoose from 'mongoose';
// Component
import { PartnerType } from './interface';

const Schema = mongoose.Schema;

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      length: { minlength: 4, maxlength: 50 },
    },
    phone: {
      type: String,
      required: true,
      length: { minlength: 4, maxlength: 50 },
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Partner = mongoose.model<PartnerType>('Partner', partnerSchema);
export default Partner;
