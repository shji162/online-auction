import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
 
  @Get()
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }
   
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
