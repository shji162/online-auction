import { Injectable } from '@nestjs/common';
import { CreaterRefreshTokenDto } from './dto/create-refreshToken.dto';
import { UpdateTokenDto } from './dto/update-refreshToken.dto';
import { Entity, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { refreshToken } from './entities/refreshToken.entity';

@Injectable()
export class TokensService {

  constructor(@InjectRepository(refreshToken) private refreshTokensRepository: Repository<refreshToken>) {}

  create(createTokenDto: CreaterRefreshTokenDto) {
    return this.refreshTokensRepository.create(createTokenDto)
  }

  findByUserId(userId: string) {
    return this.refreshTokensRepository.findOneBy({userId: userId});
  }
  
  findOne(id: string) {
    return this.refreshTokensRepository.findOneBy({id: id});
  }

  update(id: string, updateTokenDto: UpdateTokenDto) {
    return this.refreshTokensRepository.update({id: id}, updateTokenDto);
  }

  remove(id: string) {
    return this.refreshTokensRepository.delete({id: id})
  }
}
