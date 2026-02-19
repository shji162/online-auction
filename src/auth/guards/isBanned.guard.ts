import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class BannedGuard extends AuthGuard('jwt') {
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
    if (isPublic) return true;

    const isBanned = JSON.parse(atob(token.split(' ')[1])).isBanned

    if(isBanned){
        throw new ForbiddenException("ACCESS IS NOT ALLOWED")
    }
    return true 
  }
}