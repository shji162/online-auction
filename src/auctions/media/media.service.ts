import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
  constructor(@InjectRepository(Media) private mediaRepository: Repository<Media>) {}
  async create(createMediaDto: CreateMediaDto) {
    const data = this.mediaRepository.create(createMediaDto)
    return await this.mediaRepository.save(data)
  }

  async findByAuctionId(auctionId: string) {
    return await this.mediaRepository.findBy({auctionId: auctionId});
  }

  async findOne(id: string) {
    return await this.mediaRepository.findOneBy({id: id});
  }

  async update(id: string, updateMediaDto: UpdateMediaDto) {
    return await this.mediaRepository.update({id: id}, updateMediaDto)
  }

  async remove(id: string) {
    return await this.mediaRepository.delete({id: id})
  }
}
