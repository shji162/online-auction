import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { LessThan, Repository } from 'typeorm';
import { Status as AuctionStatus } from './enums/status.enum';
import { Rate } from '../rates/entities/rate.entity';
import { Deposite, DepositeStatus } from '../deposites/entities/deposite.entity';
import { History } from '../users/history/entities/history.entity';
import { Status as HistoryStatus } from '../users/enums/status.enum';
import { DepositesService } from '../deposites/deposites.service';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction) private auctionsRepository: Repository<Auction>,
    @InjectRepository(Rate) private ratesRepository: Repository<Rate>,
    @InjectRepository(Deposite) private depositesRepository: Repository<Deposite>,
    @InjectRepository(History) private historyRepository: Repository<History>,
    private depositesService: DepositesService,
  ) {}

  create(createAuctionDto: CreateAuctionDto) {
    const data = this.auctionsRepository.create({
      ...createAuctionDto,
      currentPrice: createAuctionDto.minPrice,
    });
    return this.auctionsRepository.save(data);
  }

  async findByName(name?: string, category?: string) {
    await this.closeExpired();

    const where: Partial<Auction> = {
      status: AuctionStatus.ACTIVE,
    };

    if (name) {
      Object.assign(where, { name });
    }

    if (category) {
      Object.assign(where, { category });
    }

    return this.auctionsRepository.findBy(where);
  }

  async findAll() {
    await this.closeExpired();
    return this.auctionsRepository.find();
  }

  async findOne(id: string) {
    await this.closeExpired();
    return this.auctionsRepository.findOneBy({ id });
  }

  update(id: string, updateAuctionDto: UpdateAuctionDto) {
    return this.auctionsRepository.update({ id }, updateAuctionDto);
  }

  remove(id: string) {
    return this.auctionsRepository.delete({ id });
  }

  async closeExpired() {
    const now = new Date();
    const expiredAuctions = await this.auctionsRepository.find({
      where: { status: AuctionStatus.ACTIVE, expiresIn: LessThan(now) },
    });

    if (!expiredAuctions.length) return;

    for (const auction of expiredAuctions) {
      await this.finishAuction(auction.id);
    }
  }

  async finishAuction(auctionId: string) {
    const auction = await this.auctionsRepository.findOneBy({ id: auctionId });
    if (!auction || auction.status === AuctionStatus.FINISHED) return;

    const rates = await this.ratesRepository.findBy({ auctionId });

    let winnerUserId: string | null = null;

    if (rates.length > 0) {
      const sorted = [...rates].sort((a, b) => {
        if (a.cost === b.cost) return 0;
        return a.cost > b.cost ? -1 : 1;
      });
      winnerUserId = sorted[0].userId;
    }

    const deposites = await this.depositesRepository.findBy({ auctionId });

    for (const deposite of deposites) {
      const isWinner = winnerUserId && deposite.userId === winnerUserId;
      await this.depositesService.update(deposite.id, {
        status: isWinner ? DepositeStatus.WRITTEN_OFF : DepositeStatus.RETURNED,
      });
    }

    const participants = new Set<string>();
    rates.forEach((rate) => participants.add(rate.userId));

    for (const userId of participants) {
      await this.historyRepository.save(
        this.historyRepository.create({
          userId,
          auctionId,
          status: winnerUserId && userId === winnerUserId ? HistoryStatus.WIN : HistoryStatus.LOSE,
        }),
      );
    }

    await this.auctionsRepository.update(
      { id: auctionId },
      {
        status: AuctionStatus.FINISHED,
      },
    );
  }
}
