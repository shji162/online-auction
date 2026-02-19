import { PartialType } from '@nestjs/mapped-types';
import { Deposite } from '../entities/deposite.entity';

export class UpdateDepositeDto extends PartialType(Deposite) {}
