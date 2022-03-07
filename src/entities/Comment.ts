import Entity from './Entity';

import { BeforeInsert, Column, Entity as TypeEntity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';
import User from './User';
import Post from './Post';

import { makeId } from '../util/helpers';
import Vote from './Vote';

@TypeEntity('comments')
export default class Comment extends Entity {
  constructor(comment: Partial<Comment>) {
    super();
    Object.assign(this, comment);
  }

  @Index()
  @Column()
  identifier: string

  @Column()
  body: string

  @Column()
  username: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User

  @ManyToOne(() => Post, post => post.comments, { nullable: false })
  post: Post

  @OneToMany(() => Vote, vote => vote.comment )
  votes: Vote[]

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
  makeIdAndSlug() {
    this.identifier = makeId(8)
  }
}