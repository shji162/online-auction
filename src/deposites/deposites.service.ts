import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepositeDto } from './dto/create-deposite.dto';
import { UpdateDepositeDto } from './dto/update-deposite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deposite, DepositeStatus } from './entities/deposite.entity';
import { LessThan, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Auction } from '../auctions/entities/auction.entity';

@Injectable()
export class DepositesService {
  constructor(
    @InjectRepository(Deposite) private depositeRepository: Repository<Deposite>,
    @InjectRepository(Auction) private auctionRepository: Repository<Auction>,
    private userService: UsersService,
  ) {}

  async create(createDepositeDto: CreateDepositeDto) {
    const existingUser = await this.userService.findOne(createDepositeDto.userId);
    if (!existingUser) {
      throw new BadRequestException('user not found');
    }

    const auction = await this.auctionRepository.findOneBy({ id: createDepositeDto.auctionId });
    if (!auction) {
      throw new NotFoundException('auction not found');
    }

    const isExpired = new Date(auction.expiresIn) < new Date();
    if (isExpired) {
      throw new BadRequestException('auction already finished');
    }

    if (createDepositeDto.deposite < auction.depositAmount) {
      throw new BadRequestException('deposit below required minimum');
    }

    if (existingUser.balance < createDepositeDto.deposite) {
      throw new BadRequestException('insufficient balance');
    }

    const existingActiveDeposite = await this.depositeRepository.findOneBy({
      userId: createDepositeDto.userId,
      auctionId: createDepositeDto.auctionId,
      status: DepositeStatus.ACTIVE,
    });

    if (existingActiveDeposite) {
      throw new BadRequestException('deposit already exists for this auction');
    }

    await this.userService.update(existingUser.id, {
      balance: existingUser.balance - createDepositeDto.deposite,
    });

    const data = this.depositeRepository.create({
      ...createDepositeDto,
      status: createDepositeDto.status ?? DepositeStatus.ACTIVE,
    });
    return await this.depositeRepository.save(data);
  }

  async findByEmail(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return [];
    }

    return await this.depositeRepository.findBy({ userId: user.id });
  }

  async findByAuctionId(auctionId: string) {
    return await this.depositeRepository.findBy({ auctionId });
  }

  async findOne(id: string) {
    return await this.depositeRepository.findOneBy({ id });
  }

  async findByUserAndAuction(userId: string, auctionId: string) {
    return await this.depositeRepository.findOneBy({
      userId,
      auctionId,
      status: DepositeStatus.ACTIVE,
    });
  }

  async update(id: string, updateDepositeDto: UpdateDepositeDto) {
    const existingDeposite = await this.depositeRepository.findOneBy({ id });
    if (!existingDeposite) {
      throw new BadRequestException('deposit not found');
    }

    const existingUser = await this.userService.findOne(existingDeposite.userId);
    if (!existingUser) {
      throw new BadRequestException('user not found');
    }

    const next: Partial<Deposite> = {};

    if (typeof updateDepositeDto.deposite === 'number') {
      const diff = updateDepositeDto.deposite - existingDeposite.deposite;

      if (diff > 0 && existingUser.balance < diff) {
        throw new BadRequestException('insufficient balance');
      }

      const nextBalance = existingUser.balance - diff;
      await this.userService.update(existingUser.id, { balance: nextBalance });
      next.deposite = updateDepositeDto.deposite;
    }

    if (updateDepositeDto.status) {
      next.status = updateDepositeDto.status;

      if (
        updateDepositeDto.status === DepositeStatus.RETURNED &&
        existingDeposite.status === DepositeStatus.ACTIVE &&
        existingDeposite.deposite > 0
      ) {
        const refundAmount =
          typeof updateDepositeDto.deposite === 'number'
            ? updateDepositeDto.deposite
            : existingDeposite.deposite;

        await this.userService.update(existingUser.id, {
          balance: existingUser.balance + refundAmount,
        });

        next.deposite = 0;
      }
    }

    if (Object.keys(next).length === 0) {
      return existingDeposite;
    }

    await this.depositeRepository.update({ id }, next);
    return this.depositeRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const existingDeposite = await this.depositeRepository.findOneBy({ id });
    if (!existingDeposite) {
      throw new BadRequestException('deposit not found');
    }

    const existingUser = await this.userService.findOne(existingDeposite.userId);
    if (!existingUser) {
      throw new BadRequestException('user not found');
    }

    if (existingDeposite.deposite > 0 && existingDeposite.status === DepositeStatus.ACTIVE) {
      await this.userService.update(existingUser.id, {
        balance: existingUser.balance + existingDeposite.deposite,
      });
    }

    return await this.depositeRepository.delete({ id });
  }
}
