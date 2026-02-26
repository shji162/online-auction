import { Status } from 'src/users/enums/status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  auctionId: string;

  @Column({ enum: Status })
  status: Status;
}