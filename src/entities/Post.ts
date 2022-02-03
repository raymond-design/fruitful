import {Entity as TypeEntity, Column, Index, BeforeInsert, ManyToOne, JoinColumn, OneToMany, AfterLoad} from "typeorm";

import Group from "./Group";
import { makeId, slugify } from "../util/helpers";
import Entity from './Entity';
import User from './User';
import Comment from "./Comment";
import { Expose } from "class-transformer";
import Vote from "./Vote";

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
    username: string

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User;

    @ManyToOne(() => Group, group => group.posts)
    @JoinColumn({ name: 'groupName', referencedColumnName: 'name' })
    group: Group

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]

    @OneToMany(() => Vote, vote => vote.comment)
    votes: Vote[]

    @Expose() get url(): string {
        return `/${this.group}/${this.identifier}/${this.slug}`
    }

    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier = makeId(7);
        this.slug = slugify(this.title);
    }
}