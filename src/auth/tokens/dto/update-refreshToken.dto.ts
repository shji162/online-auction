import { PartialType } from '@nestjs/mapped-types';
import { CreaterRefreshTokenDto } from './create-refreshToken.dto';

export class UpdateTokenDto extends PartialType(CreaterRefreshTokenDto) {}
