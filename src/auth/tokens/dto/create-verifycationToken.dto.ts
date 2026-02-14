import { IsNotEmpty, IsString } from "class-validator";

export class CreaterRefreshTokenDto {
    @IsString({message: "токен должен быть строкой"})
    @IsNotEmpty({message: "токен не должен быть пустым"})
    verifacationToken: string
}
