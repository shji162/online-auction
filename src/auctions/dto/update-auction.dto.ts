import { PartialType } from '@nestjs/mapped-types';
import { Auction } from '../entities/auction.entity';

export class UpdateAuctionDto extends PartialType(Auction) {}
