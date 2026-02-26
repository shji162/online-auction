import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';
import { TokensService } from '../tokens/tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../tokens/entities/verifacationToken.entity';
import { UsersService } from '../../users/users.service';
import { MailService } from '../../libs/mail/mail.service';
import { User } from '../../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token]), TypeOrmModule.forFeature([User])],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, TokensService, UsersService, MailService],
  exports: [EmailConfirmationService]
})
export class EmailConfirmationModule {}
