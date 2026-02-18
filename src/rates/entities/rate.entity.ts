import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Rate {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    userId: string
    @Column()
    auctionId: string
    @Column()
    cost: number
}