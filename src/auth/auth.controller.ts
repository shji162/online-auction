import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './DTO/login.dto';
import { RegisterUserDto } from './DTO/register.dto';
import { RefreshUserDto } from './DTO/refresh.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post("login")
  async login(@Body() user: LoginUserDto){ 
    return this.authService.login(user)
  }

  
  @Post("register")
  async register(@Body() user: RegisterUserDto){
    return this.authService.register(user)
  }

  @Post("refresh")
  async refresh(@Body() user: RefreshUserDto){
    return this.authService.refresh(user)
  }

  @Delete("logout")
  async logout(){

  }

}
