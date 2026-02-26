import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateRateDto } from './dto/rate.dto';
import { AuctionsService } from '../auctions/auctions.service';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './entities/rate.entity';
import { Repository } from 'typeorm';
import { DepositesService } from '../deposites/deposites.service';
import { MailService } from '../libs/mail/mail.service';

@Injectable()
export class RatesService {
  constructor(
    private auctionsService: AuctionsService,
    private mailService: MailService,
    private usersService: UsersService,
    private depositeService: DepositesService,
    @InjectRepository(Rate) private ratesRepository: Repository<Rate>,
  ) {}

  async newRate(dto: CreateRateDto) {
    const existingAuction = await this.auctionsService.findOne(dto.auctionId);

    if (!existingAuction) {
      throw new NotFoundException();
    }
    const isExpired = new Date(existingAuction.expiresIn) < new Date();

    if (isExpired) {
      throw new BadRequestException();
    }

    const existingUser = await this.usersService.findOne(dto.userId);

    if (!existingUser) {
      throw new NotFoundException();
    }

    if (!existingUser.isVerified) {
      throw new UnauthorizedException();
    }

    if (dto.cost <= existingAuction.currentPrice) {
      throw new BadRequestException();
    }

    if (dto.cost - existingAuction.currentPrice < existingAuction.priceStep) {
      throw new BadRequestException();
    }

    const existingDeposite = await this.depositeService.findByUserAndAuction(
      existingUser.id,
      existingAuction.id,
    );

    if (!existingDeposite) {
      throw new BadRequestException('deposit required for this auction');
    }

    await this.auctionsService.update(existingAuction.id, {
      currentPrice: dto.cost,
    });

    const rate = this.ratesRepository.create(dto);

    const usersDeposites = await this.depositeService.findByAuctionId(existingAuction.id);

    for (const deposite of usersDeposites) {
      if (deposite.userId === existingUser.id) continue;
      const user = await this.usersService.findOne(deposite.userId);
      if (user?.email) {
        this.mailService.sendRateEmail(user.email, existingAuction.name, existingUser.name);
      }
    }

    return await this.ratesRepository.save(rate);
  }

  async findByAuctionId(auctionId: string) {
    return this.ratesRepository.findBy({ auctionId });
  }
}
