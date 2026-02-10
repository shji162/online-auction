import { Roles } from "src/users/enums/user.enum"

export class CreateUserDto {
    email: string
    password: string
    name: string
    role: Roles
}
