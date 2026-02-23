import { Body, Controller, Delete, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './DTO/login.dto';
import { RegisterUserDto } from './DTO/register.dto';
import type { Request, Response } from 'express';
import { IS_DEV_ENV } from 'src/libs/common/utils/is_dev.util';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post("login")
  async login(@Res({ passthrough: true }) response: Response, @Body() user: LoginUserDto){ 
    const res = await this.authService.login(user)

    response.cookie('refreshToken', res.tokens.refreshToken, {
      httpOnly: true,
      secure: !IS_DEV_ENV,
      maxAge: 1000 * 3600 * 24 * 15,
      sameSite: 'strict'
    })

    return res
  }

  
  @Post("register")
  async register(@Res({ passthrough: true }) response: Response, @Body() user: RegisterUserDto){
    const res = await this.authService.register(user)

     response.cookie('refreshToken', res.tokens.refreshToken, {
      httpOnly: true,
      secure: !IS_DEV_ENV,
      maxAge: 1000 * 3600 * 24 * 15,
      sameSite: 'strict'
    })

    return res
  }

  @Post("refresh")
  async refresh(@Req() req: Request){
   return await this.authService.refresh(req)
  }

  @Delete("logout")
  async logout(){

  }

}
