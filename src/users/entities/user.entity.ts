import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../enums/user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true})
  email: string;

  @Column()
  name: string;

  @Column()
  password: string

  @Column({ enum: Roles, default: Roles.USER})
  role: Roles

  @Column({ default: false })
  isBanned: boolean;

  @Column({default: 0})
  balance: number
}