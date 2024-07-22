import { Schema, Document } from 'mongoose';
interface IRequest extends Document {
    productId: Schema.Types.ObjectId;
    requester_id: Schema.Types.ObjectId;
    status: string;
    productQuantity: number;
    totalPrice: number;
}
export declare const Order: import("mongoose").Model<IRequest, {}, {}, {}, Document<unknown, {}, IRequest> & IRequest & Required<{
    _id: unknown;
}>, any>;
export {};
