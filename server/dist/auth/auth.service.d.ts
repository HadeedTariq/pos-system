import { CreateOtpDto, LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
type UserAuth = {
    name: string;
    email: string;
    _id: string;
    role: string;
};
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    createOtp(createOtpDto: CreateOtpDto): Promise<void>;
    registerUser(registerUserDto: RegisterUserDto): Promise<{
        message: string;
    }>;
    validateUser(userCred: LoginUserDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.model").UserDocument> & import("./schemas/user.model").UserDocument & Required<{
        _id: unknown;
    }>>;
    generateAccessAndRefreshToken(user: UserAuth): {
        accessToken: string;
        refreshToken: string;
    };
    loginUser(loginUserDto: LoginUserDto, res: Response): Promise<void>;
    getUser(req: Request): Promise<any>;
    getUserByRefreshToken(req: Request, res: Response): Promise<void>;
    logOutUser(res: Response): Response<any, Record<string, any>>;
    signInUserWithGoogle(req: Request, res: Response): Promise<void>;
}
export {};
