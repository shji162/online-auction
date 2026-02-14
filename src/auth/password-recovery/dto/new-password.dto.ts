import { IsNotEmpty, IsString, isString, MinLength } from "class-validator";


export class newPasswordDto {
    @IsString()
    @MinLength(8, {message: "пароль должен быть длиннее 8 символов"})
    @IsNotEmpty({message: "пароль должен быть длиннее 8 символов"})
    password: string
}