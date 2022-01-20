import {Entity as TypeEntity, Column, Index, ManyToOne, JoinColumn, OneToMany} from "typeorm";

import Entity from './Entity';
import User from './User';
import Post from "./Post";

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

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @OneToMany(() => Post, post => post.group)
    posts: Post[]
}