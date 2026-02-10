import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'src/users/enums/user.enum';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService, private configService: ConfigService){}

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
            secret: "cf2956bcc563315618dce3fc22ecfa9b"
        })

        return validate
    }

    async updatePassword(email: string) {
        
    }

    async login(user: any){
        const candidate = await this.userService.findByEmail(user.email)
        if(!candidate){
            return new BadRequestException('user not exist')
        }
        const payload = { email: user.email, id: user.id, role: user.role };
        return { accessToken: this.jwtService.sign(payload, {
            secret: "cf2956bcc563315618dce3fc22ecfa9b"
        }), user: candidate};
    }

    async register(user: CreateUserDto) {
        const existingUser = await this.userService.findByEmail(user.email);

        if (existingUser) {
            throw new BadRequestException('email already exists');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser: CreateUserDto = { ...user, password: hashedPassword }; 
        await this.userService.create(newUser);
        return this.login(newUser);
  }
}
