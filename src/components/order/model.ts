import mongoose from 'mongoose';
import { OrderType, Product, ProductGroup  } from './interface';
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    partner: {
      type: Schema.Types.ObjectId,
      ref: 'Partner',
      required: false,
    },
    name: {
      type: String,
      required: true,
      length: { minlength: 4, maxlength: 50 },
    },
    phone: {
      type: String,
      required: true,
      length: { minlength: 4, maxlength: 50 },
    },
    address: {
      type: String,
      required: true,
      length: { minlength: 4, maxlength: 50 },
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array<Product | ProductGroup>,
      required: true,
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model<OrderType>('order', orderSchema);
