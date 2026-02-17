import { IsNotEmpty, IsNumber, IsString, Length, Min, IsDate } from "class-validator"

export class CreateAuctionDto {
    @IsString({message: "id должно быть строкой"})
    @IsNotEmpty({message: "id не должно быть пустым"})
    userId: string

    @IsString({message: "название должно быть строкой"})
    @IsNotEmpty({message: "название не должно быть пустым"})
    @Length(3, 64, {message: "название не должно быть меньше 3 символов и не больше 64"})
    name: string

    @IsString({message: "описание должно быть строкой"})
    @IsNotEmpty({message: "описание не должно быть пустым"})
    @Length(15, 2000, {message: "описание не должно быть меньше 15 символов "})
    description: string

    @IsNumber()
    @IsNotEmpty()
    @Min(100, {message: "минимальная начальная ставка 100р"})
    minPrice: number

    @IsNumber()
    @IsNotEmpty()
    @Min(50, {message: "минимальный шаг ставки 50р"})
    
    priceStep: number

    @IsDate({message: "укажите время окончания аукциона"})
    expiresIn: Date

    media: string
}
