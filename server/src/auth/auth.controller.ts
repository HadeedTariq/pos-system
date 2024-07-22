import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateOtpDto, LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { GoogleOAuthGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleOAuthGuard)
  handleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  handleRedirect(@Req() req: Request, @Res() res: Response) {
    return this.authService.signInUserWithGoogle(req, res);
  }

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

  @Post('logout')
  logoutUser(@Res() res: Response) {
    return this.authService.logOutUser(res);
  }
}
