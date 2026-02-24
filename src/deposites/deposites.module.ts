import { Module } from '@nestjs/common';
import { DepositesService } from './deposites.service';
import { DepositesController } from './deposites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposite } from './entities/deposite.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deposite, User])],
  controllers: [DepositesController],
  providers: [DepositesService, UsersService],
})
export class DepositesModule {}
