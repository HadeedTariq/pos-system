import mongoose, { Document } from 'mongoose';
export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    isPasswordCorrect(password: string): Promise<boolean>;
    role: string;
    refreshToken: string;
    provider: 'app' | 'google';
}
export declare const userSchema: mongoose.Schema<UserDocument, mongoose.Model<UserDocument, any, any, any, mongoose.Document<unknown, any, UserDocument> & UserDocument & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<UserDocument>> & mongoose.FlatRecord<UserDocument> & Required<{
    _id: unknown;
}>>;
export declare const User: mongoose.Model<UserDocument, {}, {}, {}, mongoose.Document<unknown, {}, UserDocument> & UserDocument & Required<{
    _id: unknown;
}>, any>;
