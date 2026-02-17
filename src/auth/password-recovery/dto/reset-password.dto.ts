import { IsEmail, IsNotEmpty, IsString,  } from "class-validator";


export class resetPasswordDto {
    @IsString({message: "e-mail должен быть строкой"})
    @IsNotEmpty({message: "e-mail не должен быть пустым"})
    @IsEmail()
    email: string
}