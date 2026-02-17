import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import jwtRefreshTokenConfig from 'src/config/jwt-refreshToken.config';
import { EmailConfirmationService } from 'src/auth/email-confirmation/email-confirmation.service';
import { TokensService } from 'src/auth/tokens/tokens.service';
import { Token } from 'src/auth/tokens/entities/verifacationToken.entity';
import { MailService } from 'src/libs/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule.forFeature(jwtRefreshTokenConfig), TypeOrmModule.forFeature([Token])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService, EmailConfirmationService, TokensService, MailService],
  exports: [UsersService]
})
export class UsersModule {}
   