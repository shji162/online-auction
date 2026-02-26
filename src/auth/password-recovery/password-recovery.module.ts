import { Module } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryController } from './password-recovery.controller';
import { TokensService } from '../tokens/tokens.service';
import { UsersService } from '../../users/users.service';
import { MailService } from '../../libs/mail/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../tokens/entities/verifacationToken.entity';
import { User } from '../../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token]), TypeOrmModule.forFeature([User])],
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService, TokensService, UsersService, MailService],
})
export class PasswordRecoveryModule {}
