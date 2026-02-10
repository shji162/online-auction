import { Body, Controller, Options, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './DTO/createUserDto.dto';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post("login")
  async login(@Body() user){ 
    return this.authService.login(user)
  }

   @Options("register")
    handleOptions(@Req() request: Request, @Res() response: Response) {
    
    response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    response.status(204).send(); 
  }

  
  @Post("register")
  async register(@Body() user: CreateUserDto){
    return this.authService.register(user)
  }
}
