import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoxerDto } from 'src/user/dto/boxer.dto'
import { Repository } from 'typeorm';
import { BoxerEntity } from 'src/user/entity/boxer.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { AES } from 'crypto-ts';
import { cryptoConstants } from '../../constants';

@Injectable()
export class BoxerService {
    constructor(
        @InjectRepository(BoxerEntity)
        private boxerRepository: Repository<BoxerEntity>
    ){}

    async add(data: any): Promise<any> {
        let user = new UserEntity;
        let newBox = new BoxerDto();
       
        let check = await this.boxerRepository.createQueryBuilder("boxer_entity")
        .where("boxer_entity.name = :name", {name: data.name})
        .select(["id", "name"]).execute();

        if (check.length > 0){
            return -1;
        }

        user.id = data.id;
        newBox.user = user;
        newBox.name = AES.encrypt(data.name, cryptoConstants.key).toString();
        newBox.items = AES.encrypt(data.items, cryptoConstants.key).toString();

        let result = await this.boxerRepository.save(newBox);
        if(result)
            return result;
        return -2;
    }

    async delete(idObj: any): Promise<number> {
    console.log(idObj.boxId);
    await this.boxerRepository.createQueryBuilder("boxer_entity")
        .delete()
        .where("boxer_entity.id = :id", {id: idObj.boxId})
        .execute();
        return idObj.boxId;
    }
}

