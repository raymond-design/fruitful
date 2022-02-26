import {Entity as TypeEntity, Column, Index, ManyToOne, JoinColumn, OneToMany} from "typeorm";

import Entity from './Entity';
import User from './User';
import Post from "./Post";
import { Expose } from "class-transformer";

@TypeEntity('groups')
export default class Group extends Entity{
    constructor(group: Partial<Group>) {
        super();
        Object.assign(this, group);
    }

    @Index()
    @Column({ unique: true })
    name: string

    @Column()
    title: string

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ nullable: true })
    imageUrn: string

    @Column({ nullable: true })
    bannerUrn: string

    @Column()
    username: string

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @OneToMany(() => Post, post => post.group)
    posts: Post[]

    @Expose()
    get imageUrl(): string {
        return this.imageUrn ? `${process.env.APP_URL}/images/${this.imageUrn}` : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=https%3A%2F%2Fexample.com%2Fimages%2Favatar.jpg';
    }

    @Expose()
    get bannerUrl(): string | undefined {
        return this.bannerUrn ? `${process.env.APP_URL}/images/${this.bannerUrn}` : undefined;
    }
}