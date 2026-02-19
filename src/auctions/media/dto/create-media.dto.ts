import { IsNotEmpty, IsString } from "class-validator"

export class CreateMediaDto {
    @IsString({message: "id должно быть строкой"})
    @IsNotEmpty({message: "укажите id"})
    auctionId: string
    @IsString({message: "ссылка должна быть строкой"})
    @IsNotEmpty({message: "укажите ссылку"})
    media: string
}
