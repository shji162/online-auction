import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../enums/user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true})
  email: string;

  @Column({ unique: true, nullable: true})
  refreshToken: string;

  @Column()
  name: string;

  @Column()
  password: string

  @Column({ enum: Roles, default: Roles.USER})
  role: Roles

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isBanned: boolean;

  @Column({default: 0})
  balance: number
}