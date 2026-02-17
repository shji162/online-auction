import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuctionsService {

  constructor(@InjectRepository(Auction) private auctionsRepository: Repository<Auction>) {}

  create(createAuctionDto: CreateAuctionDto) {
    const data = this.auctionsRepository.create({...createAuctionDto, currentPrice: createAuctionDto.minPrice})
    return this.auctionsRepository.save(data)
  }

  findByName(name: string) {
    return this.auctionsRepository.findBy({name: name})
  }

  findOne(id: string) {
    return this.auctionsRepository.findOneBy({id: id});
  }

  update(id: string, updateAuctionDto: UpdateAuctionDto) {
    return this.auctionsRepository.update({id: id}, updateAuctionDto)
  }

  remove(id: string) {
    return this.auctionsRepository.delete({id: id})
  }
}
