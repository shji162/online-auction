import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import jwtAccessTokenConfig from '../config/jwt-accessToken.config';
import jwtRefreshTokenConfig from '../config/jwt-refreshToken.config';
import { refreshJwtStrategy } from './strategies/refresh.strategy';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { TokensService } from './tokens/tokens.service';
import { Token } from './tokens/entities/verifacationToken.entity';
import { MailService } from '../libs/mail/mail.service';

@Module({
  imports: [ 
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([User, Token]),
    JwtModule.registerAsync(jwtAccessTokenConfig.asProvider()),
    ConfigModule.forFeature(jwtAccessTokenConfig),
    ConfigModule.forFeature(jwtRefreshTokenConfig),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule,
    EmailConfirmationModule
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, LocalStrategy, ConfigService, JwtStrategy, ConfigService, UsersService, TokensService, JwtService, refreshJwtStrategy, EmailConfirmationService],
  exports: [AuthService],
})
export class AuthModule {}
