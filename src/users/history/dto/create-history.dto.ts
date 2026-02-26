import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from '../../enums/status.enum';

export class CreateHistoryDto {
  @IsString({ message: 'userId должен быть строкой' })
  @IsNotEmpty({ message: 'userId не должен быть пустым' })
  userId: string;

  @IsString({ message: 'auctionId должен быть строкой' })
  @IsNotEmpty({ message: 'укажите auctionId' })
  auctionId: string;

  @IsEnum(Status, { message: 'нужно указать статус' })
  @IsNotEmpty({ message: 'нужно указать статус' })
  status: Status;
}
