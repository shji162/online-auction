import { Module } from '@nestjs/common';
import { DepositesService } from './deposites.service';
import { DepositesController } from './deposites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposite } from './entities/deposite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deposite])],
  controllers: [DepositesController],
  providers: [DepositesService],
})
export class DepositesModule {}
