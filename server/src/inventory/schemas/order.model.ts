import { Schema, Document, model } from 'mongoose';

interface IRequest extends Document {
  productId: Schema.Types.ObjectId;
  requester_id: Schema.Types.ObjectId;
  status: string;
  productQuantity: number;
}

const orderSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  requester_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'cancel'],
    default: 'pending',
  },
  productQuantity: { type: Number, required: true },
});

export const Order = model<IRequest>('Order', orderSchema);
