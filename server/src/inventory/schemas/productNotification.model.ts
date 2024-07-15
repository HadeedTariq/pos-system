import { Schema, Document, model } from 'mongoose';

interface IProdcutNotification extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  message: string;
  productId: Schema.Types.ObjectId;
  orderId: Schema.Types.ObjectId;
}

const productNotificationSchema: Schema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  },
  { timestamps: true },
);

export const ProductNotification = model<IProdcutNotification>(
  'ProductNotification',
  productNotificationSchema,
);
