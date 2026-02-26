import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from "class-validator"
import { Roles } from "../enums/user.enum"

export class CreateUserDto {
    @IsString({message: "e-mail должен быть строкой"})
    @IsNotEmpty({message: "e-mail не должен быть пустым"})
    @IsEmail()
    email: string

    @IsString({message: "пароль должен быть строкой"})
    @IsNotEmpty({message: "пароль не должен быть пустым"})
    @Length(8, 64, {message: "пароль не должен быть меньше 8 символов и не больше 64"})
    password: string

    @IsString({message: "токен должен быть строкой"})
    @IsNotEmpty({message: "токен не должен быть пустым"})
    refreshToken: string

    @IsString({message: "имя должно быть строкой"})
    @IsNotEmpty({message: "имя не должно быть пустым"})
    @Length(3, 64, {message: "имя не должно быть меньше 3 символов и не больше 64"})
    name: string

    @IsString({message: "роль должна быть строкой"})
    @IsEnum(Roles, {message: "роль должна соответствовать User или Admin"})
    role: Roles
}
