import { Schema, Document, model } from 'mongoose';

interface IProdcutNotification extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  message: string;
  productId: Schema.Types.ObjectId;
}

const productNotificationSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

export const ProductNotification = model<IProdcutNotification>(
  'ProductNotification',
  productNotificationSchema,
);
