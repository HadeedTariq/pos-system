import { Schema, Document, model } from 'mongoose';

interface IProduct extends Document {
  name: string;
  creator: string;
  price: number;
  image: string;
  details: string;
  extraImages: string[];
  stock: number;
  category: string;
  used: boolean;
  outOfStock: boolean;
  purchasers: {
    user: string;
    quantity: number;
  }[];
}

const productSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    details: { type: String, required: true },
    extraImages: {
      type: [String],
    },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    used: { type: Boolean, required: true },
    outOfStock: { type: Boolean, default: false },
    purchasers: [
      {
        user: { type: [Schema.Types.ObjectId], ref: 'User' },
        quantity: Number,
      },
    ],
  },
  { timestamps: true },
);

export const Product = model<IProduct>('Product', productSchema);
