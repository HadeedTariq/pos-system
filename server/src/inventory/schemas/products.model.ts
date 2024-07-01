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
  purchasers: string[];
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
      validate: [
        (val: string[]) => val.length === 3,
        '{PATH} must have exactly 3 images',
      ],
    },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    used: { type: Boolean, required: true },
    outOfStock: { type: Boolean, required: true },
    purchasers: { type: [Schema.Types.ObjectId], ref: 'User' },
  },
  { timestamps: true },
);

export const Product = model<IProduct>('Product', productSchema);
