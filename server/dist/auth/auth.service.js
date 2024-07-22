"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const otp_model_1 = require("./schemas/otp.model");
const custom_exception_1 = require("../custom.exception");
const otp_generator_1 = require("otp-generator");
const user_model_1 = require("./schemas/user.model");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async createOtp(createOtpDto) {
        const { email } = createOtpDto;
        const isAlreadyOtpSend = await otp_model_1.Otp.findOne({
            email,
        });
        if (isAlreadyOtpSend) {
            throw new custom_exception_1.CustomException('Otp Already Send', 401);
        }
        const otp = (0, otp_generator_1.generate)(6, {
            digits: true,
            lowerCaseAlphabets: false,
            specialChars: false,
            upperCaseAlphabets: false,
        });
        otp_model_1.Otp.create({
            email,
            otp,
        });
        throw new custom_exception_1.CustomException('Otp send to your email', 201);
    }
    async registerUser(registerUserDto) {
        try {
            const { email, otp } = registerUserDto;
            const isCorrectOtp = await otp_model_1.Otp.findOne({
                email,
                otp,
            });
            if (!isCorrectOtp) {
                throw new custom_exception_1.CustomException('Incorrect Otp', 404);
            }
            const createUser = await user_model_1.User.create(registerUserDto);
            return { message: 'User created successfully' };
        }
        catch (err) {
            throw new custom_exception_1.CustomException('Something went wrong', 404);
        }
    }
    async validateUser(userCred) {
        const { email, password } = userCred;
        const user = await user_model_1.User.findOne({
            email,
        });
        if (!user) {
            throw new custom_exception_1.CustomException('User not found', 404);
        }
        const isPassordCorrect = await user.isPasswordCorrect(password);
        if (!isPassordCorrect) {
            throw new custom_exception_1.CustomException('Incorrect Credentials', 404);
        }
        return user;
    }
    generateAccessAndRefreshToken(user) {
        const refresh_payload = {
            id: user._id,
        };
        const refreshToken = this.jwtService.sign(refresh_payload, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
        const access_payload = {
            email: user.email,
            id: user._id,
            name: user.name,
            role: user.role,
        };
        const accessToken = this.jwtService.sign(access_payload, {
            secret: process.env.JWT_ACCESS_SECRET,
        });
        return { accessToken, refreshToken };
    }
    async loginUser(loginUserDto, res) {
        const user = await this.validateUser(loginUserDto);
        const { accessToken, refreshToken } = this.generateAccessAndRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        res
            .cookie('accessToken', accessToken, {
            secure: true,
            httpOnly: false,
            sameSite: 'none',
        })
            .cookie('refreshToken', refreshToken, {
            secure: true,
            httpOnly: false,
            sameSite: 'none',
        });
        throw new custom_exception_1.CustomException('User logged in successfully', 200);
    }
    async getUser(req) {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            throw new custom_exception_1.CustomException('Access Token not found', 404);
        }
        try {
            const user = this.jwtService.verify(accessToken, {
                secret: process.env.JWT_ACCESS_SECRET,
            });
            return user;
        }
        catch (err) {
            throw new custom_exception_1.CustomException('Invalid Access Token ', 404);
        }
    }
    async getUserByRefreshToken(req, res) {
        const { refreshToken: userRefreshToken } = req.cookies;
        if (!userRefreshToken) {
            throw new custom_exception_1.CustomException('Refresh Token not found ', 404);
        }
        const userId = this.jwtService.verify(userRefreshToken, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
        const user = await user_model_1.User.findById(userId.id);
        const { accessToken, refreshToken } = this.generateAccessAndRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        res
            .cookie('accessToken', accessToken, {
            secure: true,
            httpOnly: false,
            sameSite: 'none',
        })
            .cookie('refreshToken', refreshToken, {
            secure: true,
            httpOnly: false,
            sameSite: 'none',
        });
        throw new custom_exception_1.CustomException('User logged in through refresh token successfully', 200);
    }
    logOutUser(res) {
        return res
            .clearCookie('accessToken', {
            secure: true,
            httpOnly: false,
            sameSite: 'none',
        })
            .clearCookie('refreshToken', {
            secure: true,
            httpOnly: false,
            sameSite: 'none',
        })
            .json({ message: 'User logged out' });
    }
    async signInUserWithGoogle(req, res) {
        const user = req.user;
        const existedUser = await user_model_1.User.findOne({
            email: user.email,
        });
        if (existedUser) {
            const { accessToken, refreshToken } = this.generateAccessAndRefreshToken(existedUser);
            res
                .cookie('accessToken', accessToken, {
                secure: true,
                httpOnly: false,
                sameSite: 'none',
            })
                .cookie('refreshToken', refreshToken, {
                secure: true,
                httpOnly: false,
                sameSite: 'none',
            })
                .redirect('http://localhost:5173');
            return;
        }
        const createdUser = new user_model_1.User({
            email: user.email,
            name: user.name,
            provider: user.provider,
        });
        await createdUser.save({ validateBeforeSave: false });
        const { accessToken, refreshToken } = this.generateAccessAndRefreshToken(createdUser);
        createdUser.refreshToken = refreshToken;
        await createdUser.save({ validateBeforeSave: false });
        res
            .cookie('accessToken', accessToken, {
            secure: true,
            httpOnly: false,
            sameSite: 'none',
        })
            .cookie('refreshToken', refreshToken, {
            secure: true,
            httpOnly: false,
            sameSite: 'none',
        })
            .redirect('http://localhost:5173');
        return;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map