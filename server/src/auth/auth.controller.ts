import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateOtpDto, LoginUserDto, RegisterUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sendOtp')
  createOtp(@Body(ValidationPipe) createOtpDto: CreateOtpDto) {
    return this.authService.createOtp(createOtpDto);
  }

  @Post('register')
  registerUser(@Body(ValidationPipe) registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  loginUser(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
    @Res() res: Response,
  ) {
    return this.authService.loginUser(loginUserDto, res);
  }

  @Get('/')
  getUser(@Req() req: Request) {
    return this.authService.getUser(req);
  }

  @Get('/refreshToken')
  getUserByRefreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.getUserByRefreshToken(req, res);
  }
}
