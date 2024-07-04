import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CustomException } from 'src/custom.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { accessToken } = request.cookies;

    if (!accessToken) {
      throw new CustomException('Access Token Not Found', 404);
    }

    const user = this.jwtService.verify(accessToken, {
      secret: process.env.JWT_ACCESS_SECRET,
    });

    if (!user) {
      throw new CustomException('Invalid Token ', 404);
    }

    request.user = user;
    return true;
  }
}
