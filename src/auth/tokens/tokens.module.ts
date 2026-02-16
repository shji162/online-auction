import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { verifacationToken } from './entities/verifacationToken.entity';


@Module({
  imports: [TypeOrmModule.forFeature([verifacationToken])],
  providers: [TokensService],
  exports: [TokensService]
})
export class TokensModule {}
