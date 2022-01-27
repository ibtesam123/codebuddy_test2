import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.schema";

@Entity('post')
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @ManyToOne(type => User, user => user.posts, { onDelete: 'CASCADE' })
    user: User
}