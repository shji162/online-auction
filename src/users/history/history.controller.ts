import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  async create(@Body() dto: CreateHistoryDto){
    return await this.historyService.createHistory(dto)
  }

  @Get(':userId')
  async findByUserId(@Param('userId') userId: string){
    return await this.historyService.getByUserId(userId)
  }
}
