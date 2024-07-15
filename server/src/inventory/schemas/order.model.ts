import { Schema, Document, model } from 'mongoose';

interface IRequest extends Document {
  productId: Schema.Types.ObjectId;
  requester_id: Schema.Types.ObjectId;
  status: string;
  productQuantity: number;
  totalPrice:number
}

const orderSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  requester_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'reached', 'delivered', 'cancel'],
    default: 'pending',
  },
  productQuantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

export const Order = model<IRequest>('Order', orderSchema);
