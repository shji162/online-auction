import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import type { ConfigType } from '@nestjs/config';
import { AccessTokenPayload } from '../DTO/accessTokenPayload.dto';
import jwtRefreshTokenConfig from '../../config/jwt-refreshToken.config';

@Injectable()
export class refreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(@Inject(jwtRefreshTokenConfig.KEY) private refreshJwtConfig: ConfigType<typeof jwtRefreshTokenConfig>,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtConfig.secret as string,
    });
  }

  async validate(payload: AccessTokenPayload) {
    return payload;
  }
}