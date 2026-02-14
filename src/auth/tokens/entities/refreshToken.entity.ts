import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class refreshToken {
  @PrimaryGeneratedColumn()
  id: string
  @Column()
  userId: string
  @Column({unique: true})
  refreshToken: string
}
