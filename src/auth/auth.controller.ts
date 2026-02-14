import { Body, Controller, Delete, Options, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post("login")
  async login(@Body() user){ 
    return this.authService.login(user)
  }

  
  @Post("register")
  async register(@Body() user: CreateUserDto){
    return this.authService.register(user)
  }

}
