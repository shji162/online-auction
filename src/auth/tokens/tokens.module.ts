import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { refreshToken } from './entities/refreshToken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([refreshToken])],
  providers: [TokensService],
})
export class TokensModule {}
