import { Schema, Document } from 'mongoose';
interface IProdcutNotification extends Document {
    sender: Schema.Types.ObjectId;
    receiver: Schema.Types.ObjectId;
    message: string;
    productId: Schema.Types.ObjectId;
    orderId: Schema.Types.ObjectId;
}
export declare const ProductNotification: import("mongoose").Model<IProdcutNotification, {}, {}, {}, Document<unknown, {}, IProdcutNotification> & IProdcutNotification & Required<{
    _id: unknown;
}>, any>;
export {};
