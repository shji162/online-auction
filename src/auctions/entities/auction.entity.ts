import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Auction{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    UserId: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    minPrice: number

    @Column()
    priceStep: number

    @Column()
    currentPrice: number

    @Column()
    expiresIn: Date

    @Column()
    history: string[]

    @Column({length: 5})
    media: string[]
}