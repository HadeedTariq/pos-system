import { Document } from 'mongoose';
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
export declare const Product: import("mongoose").Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct> & IProduct & Required<{
    _id: unknown;
}>, any>;
export {};
