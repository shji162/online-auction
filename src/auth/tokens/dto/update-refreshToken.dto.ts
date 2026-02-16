import { PartialType } from '@nestjs/mapped-types';
import { CreateVerifacationTokenDto } from './create-verifycationToken.dto';

export class UpdateTokenDto extends PartialType(CreateVerifacationTokenDto) {}
