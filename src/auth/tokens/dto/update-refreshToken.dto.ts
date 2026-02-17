import { PartialType } from '@nestjs/mapped-types';
import { Token } from '../entities/verifacationToken.entity';

export class UpdateTokenDto extends PartialType(Token) {}
