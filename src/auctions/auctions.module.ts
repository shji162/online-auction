import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { AuthService } from '../auth/auth.service';
import { EmailConfirmationService } from '../auth/email-confirmation/email-confirmation.service';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Token } from '../auth/tokens/entities/verifacationToken.entity';
import { Rate } from '../rates/entities/rate.entity';
import { Deposite } from '../deposites/entities/deposite.entity';
import jwtAccessTokenConfig from '../config/jwt-accessToken.config';
import jwtRefreshTokenConfig from '../config/jwt-refreshToken.config';
import { TokensService } from '../auth/tokens/tokens.service';
import { MailService } from '../libs/mail/mail.service';
import { DepositesService } from '../deposites/deposites.service';
import { History } from '../users/history/entities/history.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Auction, User, Token, Rate, Deposite, History]),
    JwtModule.registerAsync(jwtAccessTokenConfig.asProvider()),
    ConfigModule.forFeature(jwtAccessTokenConfig),
    ConfigModule.forFeature(jwtRefreshTokenConfig),
    ConfigModule,
    JwtModule
  ],
  controllers: [AuctionsController],
  providers: [
    AuctionsService,
    AuthService,
    EmailConfirmationService,
    UsersService,
    JwtService,
    ConfigService,
    TokensService,
    MailService,
    DepositesService,
  ],
})
export class AuctionsModule {}
