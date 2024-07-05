import { Injectable } from '@nestjs/common';
import { CreateOtpDto, LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { Otp } from './schemas/otp.model';
import { CustomException } from 'src/custom.exception';
import { generate as otpGenerator } from 'otp-generator';
import { User } from './schemas/user.model';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

type UserAuth = { name: string; email: string; _id: string; role: string };

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createOtp(createOtpDto: CreateOtpDto) {
    const { email } = createOtpDto;

    const isAlreadyOtpSend = await Otp.findOne({
      email,
    });

    if (isAlreadyOtpSend) {
      throw new CustomException('Otp Already Send', 401);
    }

    const otp = otpGenerator(6, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });

    Otp.create({
      email,
      otp,
    });

    throw new CustomException('Otp send to your email', 201);
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, otp } = registerUserDto;
    const isCorrectOtp = await Otp.findOne({
      email,
      otp,
    });

    if (!isCorrectOtp) {
      throw new CustomException('Incorrect Otp', 404);
    }

    const createUser = await User.create(registerUserDto);

    if (createUser) {
      throw new CustomException('User created successfully', 201);
    } else {
      throw new CustomException('Something went wrong', 404);
    }
  }

  async validateUser(userCred: LoginUserDto) {
    const { email, password } = userCred;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new CustomException('User not found', 404);
    }

    const isPassordCorrect = await user.isPasswordCorrect(password);

    if (!isPassordCorrect) {
      throw new CustomException('Incorrect Credentials', 404);
    }
    return user;
  }

  generateAccessAndRefreshToken(user: UserAuth) {
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

  async loginUser(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.validateUser(loginUserDto);

    const { accessToken, refreshToken } = this.generateAccessAndRefreshToken(
      user as UserAuth,
    );

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

    throw new CustomException('User logged in successfully', 200);
  }

  async getUser(req: Request) {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new CustomException('Access Token not found', 404);
    }

    try {
      const user = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return user;
    } catch (err) {
      throw new CustomException('Invalid Access Token ', 404);
    }
  }

  async getUserByRefreshToken(req: Request, res: Response) {
    const { refreshToken: userRefreshToken } = req.cookies;

    if (!userRefreshToken) {
      throw new CustomException('Refresh Token not found ', 404);
    }

    const userId = this.jwtService.verify(userRefreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    const user = await User.findById(userId.id);
    const { accessToken, refreshToken } = this.generateAccessAndRefreshToken(
      user as UserAuth,
    );
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

    throw new CustomException(
      'User logged in through refresh token successfully',
      200,
    );
  }

  logOutUser(res: Response) {
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
}
