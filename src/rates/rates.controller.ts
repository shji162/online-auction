import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateDto } from './dto/rate.dto';
import { JwtGuard } from '../auth/guards/auth.guard';

@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async newRate(@Body() dto: CreateRateDto){
    return this.ratesService.newRate(dto)
  }

  @Get()
  async findByAuctionId(@Query('auctionId') auctionId: string){
    return this.ratesService.findByAuctionId(auctionId)
  }
}


