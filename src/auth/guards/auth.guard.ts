import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
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
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers.authorization;
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if(request.method === "OPTIONS") return true
    if (isPublic) return true;

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }



    const accessToken = token.split(' ')[1]

    const validate = this.authService.validateToken(accessToken)

    if (!validate) {
      throw new UnauthorizedException('Invalid token');
    }

    return true 
  }
}