import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateVerifacationTokenDto {
    @IsString({message: "e-mail должен быть строкой"})
    @IsNotEmpty({message: "e-mail не должен быть пустым"})
    @IsEmail()
    email: string

    @IsString({message: "токен должен быть строкой"})
    @IsNotEmpty({message: "токен не должен быть пустым"})
    verifacationToken: string

    @IsDate({message: "время жизни токена должно быть датой"})
    @IsNotEmpty({message: "время жизни не должно быть пустым"})
    expiresIn: Date
}
