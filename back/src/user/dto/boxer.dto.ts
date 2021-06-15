import { IsNumber, IsString } from "class-validator"
import { UserEntity } from "../entity/user.entity";

export class BoxerDto {
    @IsNumber()
    id: number;

    user: UserEntity;

    @IsString()
    name: string;

    @IsString()
    items: string;
}
