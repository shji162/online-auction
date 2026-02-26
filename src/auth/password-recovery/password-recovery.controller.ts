import { Body, Controller, Post, Query } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { resetPasswordDto } from './dto/reset-password.dto';
import { ReturnDocument } from 'typeorm';
import { newPasswordDto } from './dto/new-password.dto';

@Controller('password-recovery')
export class PasswordRecoveryController {
  constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

  @Post('reset-password')
  async resetPassword(@Body() dto: resetPasswordDto){
    return await this.passwordRecoveryService.sendPasswordResetToken(dto)
  }

  @Post('new-password')
  async newPassword(
    @Body() dto: newPasswordDto,
    @Query('token') token: string,
  ) {
    return await this.passwordRecoveryService.newPassword(dto, token);
  }
}
