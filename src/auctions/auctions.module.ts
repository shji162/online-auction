import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { AuthService } from 'src/auth/auth.service';
import { EmailConfirmationService } from 'src/auth/email-confirmation/email-confirmation.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtAccessTokenConfig from 'src/config/jwt-accessToken.config';
import jwtRefreshTokenConfig from 'src/config/jwt-refreshToken.config';
import { TokensService } from 'src/auth/tokens/tokens.service';
import { MailService } from 'src/libs/mail/mail.service';
import { User } from 'src/users/entities/user.entity';
import { Token } from 'src/auth/tokens/entities/verifacationToken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, User, Token]),
    JwtModule.registerAsync(jwtAccessTokenConfig.asProvider()),
    ConfigModule.forFeature(jwtAccessTokenConfig),
    ConfigModule.forFeature(jwtRefreshTokenConfig),
    ConfigModule,
    JwtModule
  ],
  controllers: [AuctionsController],
  providers: [AuctionsService, AuthService, EmailConfirmationService, UsersService, JwtService, ConfigService, TokensService, MailService],
})
export class AuctionsModule {}
