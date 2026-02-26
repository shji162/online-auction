import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum DepositeStatus {
  ACTIVE = 'ACTIVE',
  RETURNED = 'RETURNED',
  WRITTEN_OFF = 'WRITTEN_OFF',
}

@Entity()
export class Deposite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  auctionId: string;

  @Column()
  deposite: number;

  @Column({ enum: DepositeStatus, default: DepositeStatus.ACTIVE })
  status: DepositeStatus;
}
