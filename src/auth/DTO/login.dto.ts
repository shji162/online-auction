import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from "class-validator"
import { Roles } from "src/users/enums/user.enum"

export class LoginUserDto {
    @IsString({message: "e-mail должен быть строкой"})
    @IsNotEmpty({message: "e-mail не должен быть пустым"})
    @IsEmail()
    email: string

    @IsString({message: "пароль должен быть строкой"})
    @IsNotEmpty({message: "пароль не должен быть пустым"})
    @Length(8, 64, {message: "пароль не должен быть меньше 8 символов и не больше 64"})
    password: string

}
