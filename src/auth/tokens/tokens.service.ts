import { Injectable } from '@nestjs/common';
import { UpdateTokenDto } from './dto/update-refreshToken.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { verifacationToken } from './entities/verifacationToken.entity';
import { CreateVerifacationTokenDto } from './dto/create-verifycationToken.dto';


@Injectable()
export class TokensService {

  constructor(@InjectRepository(verifacationToken) private refreshTokensRepository: Repository<verifacationToken>) {}

  create(createTokenDto: CreateVerifacationTokenDto) {
    const data = this.refreshTokensRepository.create(createTokenDto)
    return this.refreshTokensRepository.save(data)
  }

  findByEmail(email: string) {
    return this.refreshTokensRepository.findOneBy({email: email});
  }
  
  findByToken(token: string) {
    return this.refreshTokensRepository.findOneBy({verifacationToken: token});
  }

  update(id: string, updateTokenDto: UpdateTokenDto) {
    return this.refreshTokensRepository.update({id: id}, updateTokenDto);
  }

  remove(email: string) {
    return this.refreshTokensRepository.delete({email: email})
  }
}
