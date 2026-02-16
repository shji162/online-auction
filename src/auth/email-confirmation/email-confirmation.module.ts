import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';
import { TokensService } from '../tokens/tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { verifacationToken } from '../tokens/entities/verifacationToken.entity';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/libs/mail/mail.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([verifacationToken]), TypeOrmModule.forFeature([User])],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, TokensService, UsersService, MailService],
  exports: [EmailConfirmationService]
})
export class EmailConfirmationModule {}
