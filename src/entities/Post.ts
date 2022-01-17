import {Entity as TypeEntity, Column, Index, BeforeInsert, ManyToOne, JoinColumn} from "typeorm";
import { Exclude } from 'class-transformer';

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

    @Column()
    group: string

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User;

    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier = makeId(7);
        this.slug = slugify(this.title);
    }
}