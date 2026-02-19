import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { AuctionsService } from 'src/auctions/auctions.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from 'src/auctions/entities/auction.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { EmailConfirmationService } from 'src/auth/email-confirmation/email-confirmation.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtRefreshTokenConfig from 'src/config/jwt-refreshToken.config';
import jwtAccessTokenConfig from 'src/config/jwt-accessToken.config';
import { UsersModule } from 'src/users/users.module';
import { EmailConfirmationModule } from 'src/auth/email-confirmation/email-confirmation.module';
import { TokensService } from 'src/auth/tokens/tokens.service';
import { MailService } from 'src/libs/mail/mail.service';
import { Token } from 'src/auth/tokens/entities/verifacationToken.entity';
import { Rate } from './entities/rate.entity';
import { DepositesService } from 'src/deposites/deposites.service';
import { Deposite } from 'src/deposites/entities/deposite.entity';

@Module({
 imports: [
     TypeOrmModule.forFeature([User, Auction, Token, Rate, Deposite]),
     UsersModule,
     JwtModule.registerAsync(jwtAccessTokenConfig.asProvider()),
     ConfigModule.forFeature(jwtAccessTokenConfig),
     ConfigModule.forFeature(jwtRefreshTokenConfig),
     JwtModule,
     EmailConfirmationModule
   ],
  controllers: [RatesController],
  providers: [RatesService, DepositesService, AuthService, AuctionsService, UsersService, AuthService, EmailConfirmationService, JwtService, ConfigService, TokensService, MailService],
})
export class RatesModule {}
