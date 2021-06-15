import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto'
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import {hash, compare} from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AES, enc } from 'crypto-ts';
import { cryptoConstants } from '../../constants';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ){}

    async create(user: UserDto): Promise<string> {
        let newUser = new UserDto();

        let result = await this.userRepository.createQueryBuilder("user_entity")
              .where("user_entity.email = :email", {email: user.email})
              .select(["id", "email", "password"]).execute();

        if (result.length > 0){
            return 'User already created account with this email!';
        }

        newUser.email = user.email;
        newUser.password = await hash(user.password, 10);

        await this.userRepository.save(newUser);
        return 'Success';
    }

    async login(user: UserDto){

        let user_data = await this.userRepository.createQueryBuilder("user_entity")
            .where("user_entity.email = :email", {email: user.email})
            .select(["id", "email", "password"]).execute();

        if (user_data.length > 0){
            let comparePass = await compare(user.password, user_data[0].password);

            if (comparePass){
                return {
                    access_token: this.jwtService.sign(user_data[0]),
                };
            }
        }

        return "Incorrect email or password!";
    }

    async load(userID: any): Promise<any> {
        let result = await this.userRepository.findOne(userID.id, {
            relations: ['boxes']});
        for (let i=0;i<result.boxes.length;i++){
            result.boxes[i].name = AES.decrypt(result.boxes[i].name, cryptoConstants.key).toString(enc.Utf8);
            result.boxes[i].items = AES.decrypt(result.boxes[i].items, cryptoConstants.key).toString(enc.Utf8);
        }
        return result.boxes;
    }
}