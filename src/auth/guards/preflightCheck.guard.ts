import { ExecutionContext, HttpCode, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private authService: AuthService) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean | Observable<boolean> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>()
     const request = context.switchToHttp().getRequest();
   

    if (request.method === "OPTIONS"){
        response.status(200)
    }

   
    return true 
  }
}