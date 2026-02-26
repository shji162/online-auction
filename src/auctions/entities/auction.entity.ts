import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../enums/status.enum';

@Entity()
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  minPrice: number;

  @Column()
  priceStep: number;

  @Column()
  currentPrice: number;

  @Column()
  expiresIn: Date;

  @Column({ nullable: true })
  category: string;

  @Column({ default: 0 })
  depositAmount: number;

  @Column({ enum: Status, default: Status.ACTIVE })
  status: Status;
}