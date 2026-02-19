import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DepositesService } from './deposites.service';
import { CreateDepositeDto } from './dto/create-deposite.dto';
import { UpdateDepositeDto } from './dto/update-deposite.dto';

@Controller('deposites')
export class DepositesController {
  constructor(private readonly depositesService: DepositesService) {}

  @Post()
  create(@Body() createDepositeDto: CreateDepositeDto) {
    return this.depositesService.create(createDepositeDto);
  }

  @Get("auction-id")
  findByAuctionId(@Query('auctionId') auctionId: string) {
    return this.depositesService.findByAuctionId(auctionId);
  }

  @Get()
  findByEmail(@Query('email') email: string) {
    return this.depositesService.findByEmail(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depositesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepositeDto: UpdateDepositeDto) {
    return this.depositesService.update(id, updateDepositeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depositesService.remove(id);
  }
}
