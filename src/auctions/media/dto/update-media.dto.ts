import { PartialType } from '@nestjs/mapped-types';
import { Media } from '../entities/media.entity';

export class UpdateMediaDto extends PartialType(Media) {}
