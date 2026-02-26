import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtRefreshTokenConfig from '../config/jwt-refreshToken.config';
import { EmailConfirmationService } from '../auth/email-confirmation/email-confirmation.service';
import { TokensService } from '../auth/tokens/tokens.service';
import { Token } from '../auth/tokens/entities/verifacationToken.entity';
import { MailService } from '../libs/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule.forFeature(jwtRefreshTokenConfig), TypeOrmModule.forFeature([Token]),
 ConfigModule.forRoot({
      isGlobal: true
    }),],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService, EmailConfirmationService, TokensService, MailService, ConfigService],
  exports: [UsersService]
})
export class UsersModule {}
   