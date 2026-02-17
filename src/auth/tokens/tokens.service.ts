import { Injectable } from '@nestjs/common';
import { UpdateTokenDto } from './dto/update-refreshToken.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/verifacationToken.entity';
import { CreateTokenDto } from './dto/create-token.dto';
import { TokenTypes } from './enums/tokenType.enum';


@Injectable()
export class TokensService {

  constructor(@InjectRepository(Token) private tokensRepository: Repository<Token>) {}

  create(createTokenDto: CreateTokenDto) {
    const data = this.tokensRepository.create(createTokenDto)
    return this.tokensRepository.save(data)
  }

  findByEmail(email: string, type: TokenTypes) {
    return this.tokensRepository.findOneBy({email: email, type: type});
  }
  
  findByToken(token: string) {
    return this.tokensRepository.findOneBy({token: token});
  }

  update(id: string, updateTokenDto: UpdateTokenDto) {
    return this.tokensRepository.update({id: id}, updateTokenDto);
  }

  remove(email: string) {
    return this.tokensRepository.delete({email: email})
  }
}
