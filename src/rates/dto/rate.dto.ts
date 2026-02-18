import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRateDto {
    @IsString({message: "userId должен быть строкой"})
    @IsNotEmpty({message: "userId не должен быть пустым"})
    userId: string

    @IsString({message: "auctionId должен быть строкой"})
    @IsNotEmpty({message: "auctionId не должен быть пустым"})
    auctionId: string

    @IsNumber({}, {message: "ставка должна быть числом"})
    @IsNotEmpty({message: "нужно указать сумму ставки"})
    cost: number

}
