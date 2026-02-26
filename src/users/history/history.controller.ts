import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  async create(@Body() dto: CreateHistoryDto){
    return await this.historyService.createHistory(dto)
  }

  @Get()
  async findByAuctionId(@Query('auctionId') auctionId: string){
    return await this.historyService.getByAuctionId(auctionId)
  }
}
