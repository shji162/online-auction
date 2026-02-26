import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DepositeStatus } from '../entities/deposite.entity';

export class CreateDepositeDto {
  @IsString({ message: 'userId должен быть строкой' })
  @IsNotEmpty({ message: 'userId не должен быть пустым' })
  userId: string;

  @IsString({ message: 'auctionId должен быть строкой' })
  @IsNotEmpty({ message: 'auctionId не должен быть пустым' })
  auctionId: string;

  @IsNumber({}, { message: 'депозит должен быть числом' })
  @IsNotEmpty({ message: 'нужно указать сумму депозита' })
  deposite: number;

  @IsEnum(DepositeStatus, { message: 'некорректный статус депозита' })
  status?: DepositeStatus;
}
