import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Post } from "./post.schema"

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(type => Post, post => post.user, { onDelete: 'CASCADE' })
    posts: Post[]
}