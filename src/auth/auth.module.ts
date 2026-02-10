import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/users/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: userSchema}]),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],  
      useFactory: async (configService: ConfigService) => ({
        secret: "cf2956bcc563315618dce3fc22ecfa9b",
        signOptions: {
          expiresIn: "1d",
        },
      }),
      inject: [ConfigService],
      
    }),
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService, UsersService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
