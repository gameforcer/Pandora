import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class BoxerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    items: string;

    @ManyToOne(() => UserEntity, user => user.boxes, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    user: UserEntity;
}