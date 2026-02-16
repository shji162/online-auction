import { Body, Controller, Post, Req } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import type { Request } from 'express';
import { confirmationDto } from './dto/confirmation.dto';

@Controller('auth/email-confirmation')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

  @Post()
  async newVerifacation(@Req() req: Request, @Body() dto: confirmationDto){
    return this.emailConfirmationService.newVerifacation(req, dto)
  }
}
