import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRateDto } from './dto/rate.dto';
import { AuctionsService } from 'src/auctions/auctions.service';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './entities/rate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatesService {

    constructor(private auctionsService: AuctionsService, private usersService: UsersService, @InjectRepository(Rate) private ratesRepository: Repository<Rate>) {}

    async newRate(dto: CreateRateDto){
        const existingAuction = await this.auctionsService.findOne(dto.auctionId)

        if(!existingAuction){
            throw new NotFoundException()
        }
        const isExpired = new Date(existingAuction.expiresIn) < new Date()
        
        if(isExpired){
            throw new BadRequestException()
        }

        const existingUser = await this.usersService.findOne(dto.userId)

        if(!existingUser){
            throw new NotFoundException()
        }
        
        if(!existingUser.isVerified){
            throw new UnauthorizedException()
        }

        if(dto.cost < existingAuction.currentPrice){
            throw new BadRequestException()
        }
        
        await this.auctionsService.update(existingAuction.id, {
            currentPrice: dto.cost
        })

        const rate = this.ratesRepository.create(dto)

        return await this.ratesRepository.save(rate)
    }

    async findByAuctionId(auctionId: string){
        return this.ratesRepository.findBy({auctionId: auctionId})
    }
}
