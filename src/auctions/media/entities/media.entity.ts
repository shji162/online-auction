import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Media {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    auctionId: string
    @Column()
    media: string
}
