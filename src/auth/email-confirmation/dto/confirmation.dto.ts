import { IsNotEmpty, IsString } from "class-validator";


export class confirmationDto {
    @IsString({message: "токен должен быть строкой"})
    @IsNotEmpty({message: "токен не дожен быть пустым"})
    token: string
}