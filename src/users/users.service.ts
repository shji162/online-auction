import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}
  async create(userDto: CreateUserDto) {
    return await this.userModel.create({...userDto, id: Date.now().toString()})
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find({});
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findOneBy({id: id});
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOneBy({email: email });
  }

  async update(id: string, updateUserDto: CreateUserDto) {
    return await this.userModel.update({id: id}, updateUserDto);
  }

  async remove(id: string) {
    return await this.userModel.delete({id: id});
  }
}
