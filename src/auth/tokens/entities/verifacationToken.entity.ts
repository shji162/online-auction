import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TokenTypes } from '../enums/tokenType.enum';

@Entity()
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  expiresIn: Date

  @Column()
  email: string

  @Column({unique: true})
  token: string

  @Column({enum: TokenTypes})
  type: TokenTypes

}
