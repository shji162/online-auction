import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
import { CreateUserDto } from '../users/dto/create-user.dto';
import type { ConfigType } from '@nestjs/config';
import jwtRefreshTokenConfig from 'src/config/jwt-refreshToken.config';
import { RegisterUserDto } from './DTO/register.dto';
import { LoginUserDto } from './DTO/login.dto';
import { RefreshUserDto } from './DTO/refresh.dto';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';

@Injectable()
export class AuthService {
    
    constructor(private emailConfirmationService: EmailConfirmationService, private userService: UsersService, private jwtService: JwtService, @Inject(jwtRefreshTokenConfig.KEY) private refreshConfig: ConfigType<typeof jwtRefreshTokenConfig>){}


    async refresh(user: RefreshUserDto) {
       const candidate = await this.userService.findByEmail(user.email)
        if(!candidate){
            return new BadRequestException('user not exist')
        }

        const payload = { email: candidate.email, role: candidate.role };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: "cf2956bcc563315618dce3fc22ecfa9a"
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

    async validateToken(token: string) {
        const validate = this.jwtService.verify(token, {
            secret: "cf2956bcc563315618dce3fc22ecfa9a"
        })

        return validate
    }

    async updatePassword(email: string) {
        
    }

    async generateTokens(user: any) {
    const payload = { email: user.email, role: user.role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
            secret: "cf2956bcc563315618dce3fc22ecfa9a"
        }),
      this.jwtService.signAsync(payload, {
            secret: "cf2956bcc563315618dce3fc22ecfa9b"
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
            return new BadRequestException('user not exist')
        }
        if(!candidate.isVerified){
            await this.emailConfirmationService.sendVerifacationToken(candidate)
            throw new UnauthorizedException()
        }
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
