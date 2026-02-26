import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from "class-validator"
import { Roles } from "../../users/enums/user.enum"

export class LoginUserDto {
    @IsString({message: "e-mail должен быть строкой"})
    @IsNotEmpty({message: "e-mail не должен быть пустым"})
    @IsEmail()
    email: string

    password: string

}
