import {Entity as TypeEntity, Column, Index, BeforeInsert, ManyToOne, JoinColumn, OneToMany, AfterLoad} from "typeorm";

import Group from "./Group";
import { makeId, slugify } from "../util/helpers";
import Entity from './Entity';
import User from './User';
import Comment from "./Comment";
import { Exclude, Expose } from "class-transformer";
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

    @Column()
    groupName: string

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

    @Exclude()
    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]

    @Exclude()
    @OneToMany(() => Vote, vote => vote.post)
    votes: Vote[]

    @Expose() get url(): string {
        return `/group/${this.groupName}/${this.identifier}/${this.slug}`
    }

    @Expose() get CommentCount(): number {
        return this.comments?.length
    }

    @Expose() get voteScore(): number {
        return this.votes?.reduce((prev, cur) => 
            prev + (cur.value || 0), 0
        )
    }

    protected userVote: number
    setUserVote(user: User) {
        const index = this.votes?.findIndex(v => v.username === user.username);
        this.userVote = index > -1 ? this.votes[index].value : 0
    }
    
    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier = makeId(7);
        this.slug = slugify(this.title);
    }
}