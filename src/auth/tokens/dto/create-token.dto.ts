import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { TokenTypes } from "../enums/tokenType.enum";

export class CreateTokenDto {
    @IsString({message: "e-mail должен быть строкой"})
    @IsNotEmpty({message: "e-mail не должен быть пустым"})
    @IsEmail()
    email: string

    @IsString({message: "токен должен быть строкой"})
    @IsNotEmpty({message: "токен не должен быть пустым"})
    token: string

    @IsDate({message: "время жизни токена должно быть датой"})
    @IsNotEmpty({message: "время жизни не должно быть пустым"})
    expiresIn: Date

    type: TokenTypes
}
