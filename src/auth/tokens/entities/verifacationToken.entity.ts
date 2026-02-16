import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class verifacationToken {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  expiresIn: Date

  @Column()
  email: string

  @Column({unique: true})
  verifacationToken: string
}
