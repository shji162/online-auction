import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { AuctionsService } from '../auctions/auctions.service';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from '../auctions/entities/auction.entity';
import { User } from '../users/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { EmailConfirmationService } from '../auth/email-confirmation/email-confirmation.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtRefreshTokenConfig from '../config/jwt-refreshToken.config';
import jwtAccessTokenConfig from '../config/jwt-accessToken.config';
import { UsersModule } from '../users/users.module';
import { EmailConfirmationModule } from '../auth/email-confirmation/email-confirmation.module';
import { TokensService } from '../auth/tokens/tokens.service';
import { MailService } from '../libs/mail/mail.service';
import { Token } from '../auth/tokens/entities/verifacationToken.entity';
import { Rate } from './entities/rate.entity';
import { DepositesService } from '../deposites/deposites.service';
import { Deposite } from '../deposites/entities/deposite.entity';
import { History } from '../users/history/entities/history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Auction, Token, Rate, Deposite, History]),
    UsersModule,
    JwtModule.registerAsync(jwtAccessTokenConfig.asProvider()),
    ConfigModule.forFeature(jwtAccessTokenConfig),
    ConfigModule.forFeature(jwtRefreshTokenConfig),
    JwtModule,
    EmailConfirmationModule,
  ],
  controllers: [RatesController],
  providers: [
    RatesService,
    DepositesService,
    AuthService,
    AuctionsService,
    UsersService,
    AuthService,
    EmailConfirmationService,
    JwtService,
    ConfigService,
    TokensService,
    MailService,
  ],
})
export class RatesModule {}
