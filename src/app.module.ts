import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionsModule } from './auctions/auctions.module';
import { MailModule } from './libs/mail/mail.module';
import { PasswordRecoveryModule } from './auth/password-recovery/password-recovery.module';
import { EmailConfirmationModule } from './auth/email-confirmation/email-confirmation.module';
import { TokensModule } from './auth/tokens/tokens.module';
import dbConfig from './config/db.config';
import { ConfigModule } from '@nestjs/config';
import { IS_DEV_ENV } from './libs/common/utils/is_dev.util';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RatesModule } from './rates/rates.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig
    }),
    UsersModule,
    AuthModule,
    AuctionsModule,
    MailModule,
    PasswordRecoveryModule,
    EmailConfirmationModule,
    TokensModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: IS_DEV_ENV
    }),
    RatesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
