import { DepositeStatus } from '../entities/deposite.entity';

export class UpdateDepositeDto {
  deposite?: number;
  status?: DepositeStatus;
}
