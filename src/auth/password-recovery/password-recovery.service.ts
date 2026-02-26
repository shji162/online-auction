import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TokensService } from '../tokens/tokens.service';
import { TokenTypes } from '../tokens/enums/tokenType.enum';
import { resetPasswordDto } from './dto/reset-password.dto';
import { UsersService } from '../../users/users.service';
import { MailService } from '../../libs/mail/mail.service';
import { newPasswordDto } from './dto/new-password.dto';
import * as bcrypt from "bcryptjs"

@Injectable()
export class PasswordRecoveryService {

    constructor(private tokenService: TokensService, private userService: UsersService, private mailService: MailService) {}

    async sendPasswordResetToken(dto: resetPasswordDto) {
            const existingUser = await this.userService.findByEmail(dto.email)

            if(!existingUser){
                throw new NotFoundException()
            }

            const passwordResetToken = await this.generatePasswordResetToken(existingUser.email)
    
            await this.mailService.sendPasswordResetEmail(existingUser.email, passwordResetToken.token)
    
            return true
    }

    async newPassword(dto: newPasswordDto, token: string){
        const existingToken = await this.tokenService.findByToken(token)
        if(!existingToken){
            throw new NotFoundException()
        }
        
        const isExpired = new Date(existingToken.expiresIn) < new Date()
        
        if(isExpired){
            throw new BadRequestException()
        }
        
        const existingUser = await this.userService.findByEmail(existingToken.email)
        
        if(!existingUser){
            throw new NotFoundException()
        }
        
        await this.userService.update(existingUser.id, {
            password: await bcrypt.hash(dto.password, 10)
        })
        
        await this.tokenService.remove(existingToken.email)
        
        return existingUser
    }

    async generatePasswordResetToken(email: string) {
        const token = uuidv4()
        const expiresIn = new Date(new Date().getTime() + 3600 * 1000)

        const existingToken = await this.tokenService.findByEmail(email, TokenTypes.RESET)
        if(existingToken){
            await this.tokenService.remove(email)
        }

        const passwordResetToken = await this.tokenService.create({email, token: token, expiresIn, type: TokenTypes.RESET})

        return passwordResetToken
    }
}
