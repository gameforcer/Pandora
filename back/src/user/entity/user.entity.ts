import {Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BoxerEntity } from "./boxer.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    email: string;

    @Column({ name: 'password' , nullable: false })
    password: string;

    @OneToMany(() => BoxerEntity, boxes => boxes.user)
    boxes: BoxerEntity[];

}
