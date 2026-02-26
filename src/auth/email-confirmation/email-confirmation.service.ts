import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { TokensService } from '../tokens/tokens.service';
import { Request } from 'express';
import { confirmationDto } from './dto/confirmation.dto';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { MailService } from '../../libs/mail/mail.service';
import { TokenTypes } from '../tokens/enums/tokenType.enum';

@Injectable()
export class EmailConfirmationService {

    constructor(private tokenService: TokensService, private userService: UsersService, private mailService: MailService) {}

    async newVerifacation(req: Request, dto: confirmationDto) {
         const existingToken = await this.tokenService.findByToken(dto.token)
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
                isVerified: true
            })

            await this.tokenService.remove(existingToken.email)

            return existingUser
    }

    async sendVerifacationToken(user: User) {
        const verificationToken = await this.generateVerifacationToken(user.email)

        await this.mailService.sendConfirmationEmail(user.email, verificationToken.token)

        return true
    }
    
    async generateVerifacationToken(email: string) {
        const token = uuidv4()
        const expiresIn = new Date(new Date().getTime() + 3600 * 1000)

        const existingToken = await this.tokenService.findByEmail(email, TokenTypes.VERIFACATION)
        if(existingToken){
            await this.tokenService.remove(email)
        }

        const verificationToken = await this.tokenService.create({email, token: token, expiresIn, type: TokenTypes.VERIFACATION})

        return verificationToken
    }

}
