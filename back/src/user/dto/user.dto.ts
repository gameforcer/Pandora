import { IsNumber, IsString } from "class-validator"

export class UserDto {
    @IsNumber()
    id: number;

    @IsString()
    email: string;

    @IsString()
    password: string;
}
