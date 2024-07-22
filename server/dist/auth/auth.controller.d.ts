import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateOtpDto, LoginUserDto, RegisterUserDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    handleLogin(): void;
    handleRedirect(req: Request, res: Response): Promise<void>;
    createOtp(createOtpDto: CreateOtpDto): Promise<void>;
    registerUser(registerUserDto: RegisterUserDto): Promise<{
        message: string;
    }>;
    loginUser(loginUserDto: LoginUserDto, res: Response): Promise<void>;
    getUser(req: Request): Promise<any>;
    getUserByRefreshToken(req: Request, res: Response): Promise<void>;
    logoutUser(res: Response): Response<any, Record<string, any>>;
}
