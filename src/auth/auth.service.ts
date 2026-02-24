import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
import { CreateUserDto } from '../users/dto/create-user.dto';
import type { ConfigService, ConfigType } from '@nestjs/config';
import jwtRefreshTokenConfig from 'src/config/jwt-refreshToken.config';
import { RegisterUserDto } from './DTO/register.dto';
import { LoginUserDto } from './DTO/login.dto';
import { RefreshUserDto } from './DTO/refresh.dto';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
    
    constructor(private emailConfirmationService: EmailConfirmationService, @Inject(forwardRef(() => UsersService)) private userService: UsersService, private jwtService: JwtService){}


    async refresh(req: Request) {
       const refreshToken: string = req.cookies['refreshToken']
       const isValidToken = this.validateRefreshToken(refreshToken)
       if(!isValidToken){
            throw new UnauthorizedException()
       }

       const email = JSON.parse(atob(refreshToken.split('.')[1])).email
       const candidate = await this.userService.findByEmail(email)
        if(!candidate){
            throw new BadRequestException('user not exist')
        }

        const payload = { email: candidate.email, role: candidate.role };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: "access"
        })
        return { accessToken, user: candidate};
    }

    async validate(password: string, email: string) { 
        const user = await this.userService.findByEmail(email)
        if(!user){
            return new UnauthorizedException("") 
        }
        const compare = bcrypt.compare(password, user.password)
        if(!compare){
            return new BadRequestException("") 
        }
        return user
    }

    async validateAccessToken(token: string) {
        console.log(token)
        const validate = this.jwtService.verify(token, {
            secret: "access"
        })

        return validate
    }

    async validateRefreshToken(token: string) {
        const validate = this.jwtService.verify(token, {
            secret: "refresh"
        })

        return validate
    }


    async generateTokens(user: any) {
    const payload = { email: user.email, role: user.role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
            secret: "access"
        }),
      this.jwtService.signAsync(payload, {
            secret: "refresh"
        }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

    async login(user: LoginUserDto){
        const candidate = await this.userService.findByEmail(user.email)
        if(!candidate){
            throw new BadRequestException('user not exist')
        }
       /* if(!candidate.isVerified){
            await this.emailConfirmationService.sendVerifacationToken(candidate)
            throw new UnauthorizedException()
        }*/
        const tokens = await this.generateTokens(candidate)
        return { tokens, user: candidate};
    }

    async register(user: RegisterUserDto) {
        const existingUser = await this.userService.findByEmail(user.email);

        if (existingUser) {
            throw new BadRequestException('email already exists');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser: RegisterUserDto = { ...user, password: hashedPassword }; 
        
        const tokens = await this.generateTokens(newUser)

        const res = await this.userService.create({...newUser, refreshToken: tokens.refreshToken});

        await this.emailConfirmationService.sendVerifacationToken(res)

        return { tokens, user: res};
  }
}
