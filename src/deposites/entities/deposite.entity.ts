import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Deposite {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column({unique: true})
    email: string
    @Column()
    auctionId: string
    @Column()
    deposite: number
}
