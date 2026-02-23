import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDepositeDto } from './dto/create-deposite.dto';
import { UpdateDepositeDto } from './dto/update-deposite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deposite } from './entities/deposite.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DepositesService {
  constructor(@InjectRepository(Deposite) private depositeRepository: Repository<Deposite>, private userService: UsersService) {}

  async create(createDepositeDto: CreateDepositeDto) {
    const existingUser = await this.userService.findByEmail(createDepositeDto.email)
    if(!existingUser){
      throw new BadRequestException()
    }
    if(existingUser.balance < createDepositeDto.deposite){
      throw new BadRequestException()
    }
    await this.userService.update(existingUser.id, {
      balance: existingUser.balance - createDepositeDto.deposite
    })
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
    const existingDeposite = await this.depositeRepository.findOneBy({id: id})
    if(!existingDeposite){
      throw new BadRequestException()
    }
     const existingUser = await this.userService.findByEmail(existingDeposite!.email)
    if(!existingUser){
      throw new BadRequestException()
    }
    if(existingUser.balance < updateDepositeDto.deposite - existingDeposite.deposite){
      throw new BadRequestException()
    }
    await this.userService.update(existingUser.id, {
      balance: existingUser.balance - updateDepositeDto.deposite + updateDepositeDto.deposite
    })
  
    return await this.depositeRepository.update({id: id}, updateDepositeDto)
  }

  async remove(id: string) {
     const existingDeposite = await this.depositeRepository.findOneBy({id: id})
    if(!existingDeposite){
      throw new BadRequestException()
    }
    const existingUser = await this.userService.findByEmail(existingDeposite.email)
    if(!existingUser){
      throw new BadRequestException()
    }
    await this.userService.update(existingUser.id, {
      balance: existingUser.balance + existingDeposite.deposite
    })
  
    return await this.depositeRepository.delete({id: id})
  }
}
