import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/create-history.dto';

@Injectable()
export class HistoryService {
    constructor(@InjectRepository(History) private historyRepository: Repository<History>) {}

    async createHistory(dto: CreateHistoryDto){
        const data = this.historyRepository.create(dto)
        return await this.historyRepository.save(data)
    }

    async getByUserId(userId: string) {
        return await this.historyRepository.findBy({userId: userId})
    }
}
