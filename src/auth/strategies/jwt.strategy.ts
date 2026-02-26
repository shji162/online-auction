import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import type { ConfigType } from '@nestjs/config';
import { AccessTokenPayload } from '../DTO/accessTokenPayload.dto';
import jwtAccessTokenConfig from '../../config/jwt-accessToken.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(jwtAccessTokenConfig.KEY) private JwtConfig: ConfigType<typeof jwtAccessTokenConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtConfig.secret as string,
    });
  }

  async validate(payload: AccessTokenPayload) {
    return payload;
  }
}