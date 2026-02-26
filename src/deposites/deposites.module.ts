import { Module } from '@nestjs/common';
import { DepositesService } from './deposites.service';
import { DepositesController } from './deposites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposite } from './entities/deposite.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Auction } from '../auctions/entities/auction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deposite, User, Auction])],
  controllers: [DepositesController],
  providers: [DepositesService, UsersService],
})
export class DepositesModule {}
