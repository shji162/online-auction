import { Injectable } from '@nestjs/common';
import { CreateDepositeDto } from './dto/create-deposite.dto';
import { UpdateDepositeDto } from './dto/update-deposite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deposite } from './entities/deposite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepositesService {
  constructor(@InjectRepository(Deposite) private depositeRepository: Repository<Deposite>) {}

  async create(createDepositeDto: CreateDepositeDto) {
    const data = this.depositeRepository.create(createDepositeDto)
    return await this.depositeRepository.save(data)
  }

  async findByEmail(email: string) {
    return await this.depositeRepository.findOneBy({email: email})
  }

  async findByAuctionId(auctionId: string) {
    return await this.depositeRepository.findBy({auctionId: auctionId})
  }

  async findOne(id: string) {
    return await this.depositeRepository.findOneBy({id: id})
  }

  async update(id: string, updateDepositeDto: UpdateDepositeDto) {
    return await this.depositeRepository.update({id: id}, updateDepositeDto)
  }

  async remove(id: string) {
    return await this.depositeRepository.delete({id: id})
  }
}
