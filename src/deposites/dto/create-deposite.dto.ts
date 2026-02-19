import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateDepositeDto {
    
    @IsString({message: "userId должен быть строкой"})
    @IsNotEmpty({message: "userId не должен быть пустым"})
    userId: string
    
    @IsString({message: "email должен быть строкой"})
    @IsNotEmpty({message: "укажите email"})
    @IsEmail()
    email: string
    
    @IsNumber({}, {message: "депозит должна быть числом"})
    @IsNotEmpty({message: "нужно указать сумму депозита"})
    deposite: number
    
}
