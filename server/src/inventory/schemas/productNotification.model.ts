import { Schema, Document, model } from 'mongoose';

interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  message: string;
  productId: Schema.Types.ObjectId;
}

const productNotficationSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

export const ProductNotfication = model<IMessage>(
  'Message',
  productNotficationSchema,
);
