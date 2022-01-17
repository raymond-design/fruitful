import {Entity as TypeEntity, Column, Index, BeforeInsert, ManyToOne, JoinColumn} from "typeorm";
import { Exclude } from 'class-transformer';

import Group from "./Group";
import { makeId, slugify } from "../util/helpers";
import Entity from './Entity';
import User from './User';

@TypeEntity('posts')
export default class Post extends Entity{
    constructor(post: Partial<Post>) {
        super();
        Object.assign(this, post);
    }

    @Index()
    @Column()
    identifier: string

    @Column()
    title: string

    @Index()
    @Column()
    slug: string

    @Column({ nullable: true, type: 'text'})
    body: string

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User;

    @ManyToOne(() => Group, group => group.posts)
    @JoinColumn({ name: 'groupName', referencedColumnName: 'name' })
    group: Group

    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier = makeId(7);
        this.slug = slugify(this.title);
    }
}